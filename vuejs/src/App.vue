<template>
  <v-app class="app">
    <section class="NavBar">
      <v-app-bar app color="#5F7174" dark elevate-on-scroll>
        <v-app-bar-nav-icon @click="drawer = true">
          <v-tooltip color="#5F7174" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" text fab>
                <v-icon color="white" size="30">
                  mdi-account-group
                </v-icon>
              </v-btn>
            </template>
            <span class="tooltip-text">© Developers informations</span>
          </v-tooltip>
        </v-app-bar-nav-icon>
        <v-toolbar-title>
          <v-tooltip color="#5F7174" bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" class="toolbar-title-left">Belfort </span><span v-bind="attrs" v-on="on" class="toolbar-title-right">Analytica</span>
            </template>
            <span class="tooltip-text">© IUT Nord Franche-Comté project</span>
          </v-tooltip>
        </v-toolbar-title>
        <v-spacer />
        <v-tooltip color="#5F7174" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text fab @click="$router.push('/')">
              <v-icon color="#A5E65A" size="30">
                mdi-home
              </v-icon>
            </v-btn>
          </template>
          <span class="tooltip-text">Show home</span>
        </v-tooltip>
        <v-tooltip color="#5F7174" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text fab @click="displayWindow('/graphics')">
              <v-icon color="#32D9CB" size="30">
                mdi-poll
              </v-icon>
            </v-btn>
          </template>
          <span class="tooltip-text">Show graphics</span>
        </v-tooltip>
        <v-tooltip color="#5F7174" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text fab @click="displayWindow('/predictions')">
              <v-icon color="#32D9CB" size="30">
                mdi-chart-bell-curve
              </v-icon>
            </v-btn>
          </template>
          <span class="tooltip-text">Show predictions</span>
        </v-tooltip>
        <v-tooltip v-if="!dataUpdate" color="#5F7174" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text fab @click="dataRefresh">
              <v-icon color="white" size="30">
                mdi-file-refresh
              </v-icon>
            </v-btn>
          </template>
          <span class="tooltip-text">Data refresh</span>
        </v-tooltip>
      </v-app-bar>
    </section>

    <section class="Drawer">
      <v-navigation-drawer v-model="drawer" absolute temporary color="#5F7174">
        <v-row class="mt-3" align="center" no-gutters>
          <v-col cols="3" align="center" no-gutters>
            <v-avatar size="45"><img src="https://cdn.discordapp.com/attachments/711867110221152278/1068090823478100008/PHOTO-2022-09-08-16-15-24_2.jpg" alt="Maxime"></v-avatar>
          </v-col>
          <v-col align="start" align-self="center" no-gutters>
            <v-col class="pa-0" cols="12" align="start" no-gutters>
              <span class="avatar-text">Maxime CRAYSSAC</span>
            </v-col>
            <v-col class="pa-0" cols="12" align="start" no-gutters>
              <span class="avatar-text-secondary">Créateur</span>
            </v-col>
          </v-col>
        </v-row>
      </v-navigation-drawer>
    </section>

    <section class="Main">
      <v-main>
        <v-alert v-if="dataUpdate" class="mx-16 my-3 alertText" border="left" color="#00A6C0" elevation="6" type="error">
          <v-row>
            <v-col cols="auto">
              {{ dataUpdateValue }}
            </v-col>
            <v-spacer/>
            <v-col class="alertNumber" v-if="timer" cols="auto">
              {{ timer }}
            </v-col>
          </v-row>
        </v-alert>

        <router-view/>

        <v-snackbar color="#32D9CB" v-model="snackbar" timeout="-1">
          <span class="snackbar-text">{{ snackbarText }}</span>
          <template #action="{ attrs }">
            <v-btn fab class="mx-0 px-0" text v-bind="attrs" @click="snackbar = false;">
              <v-icon color="#5F7174" size="28">
                mdi-close-box
              </v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </v-main>
    </section>
  </v-app>
</template>

<script>
import axios from 'axios';
import {mapState} from "vuex";
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    refresh: false,
    callback: null,
    snackbar: false,
    snackbarText: null,
    timer: null,
  }),
  computed:{
    ...mapState(['dataUpdate', 'dataUpdateValue'])
  },
  methods:{
    dataRefresh() {
      let self = this;
      this.$store.commit('setDataUpdate', 'updating');
      self.$store.commit('setDataUpdateValue', 'Data update in progress... Please wait the end !');
      axios.get('http://localhost:3000/refresh').then(function (response) {
        setTimeout(() => {
          self.callback = true;
          self.$store.commit('setDataUpdate', null);
          self.timer = null;
          if (response.status === 204) self.snackbarText = `All your files are up to date !`;
          else self.snackbarText = `Updating data successful !`;
          self.snackbar = true;
          console.log(response);
        }, 200);
      }).catch(function (error) {
        self.callback = true;
        self.$store.commit('setDataUpdate', null);
        self.timer = null;
        self.snackbar = true;
        self.snackbarText = error;
        console.log(error);
      })
      setTimeout(() => {
        if (!self.callback) {
          axios.get('http://localhost:3000/mean/minutes').then(function (response) {
            self.startTimer(parseInt(response.data.data.minutes) + (response.data.data.seconds / 60))
            self.$store.commit('setDataUpdateValue', `Waiting time is around ${response.data.data.minutes} minutes and ${response.data.data.seconds} seconds calculated from your last data imports. Please wait !`);
          }).catch(function (error) {
            if (error.data === null) self.$store.commit('setDataUpdateValue', `No imports found before this importation. Waiting time will be short or long... Please wait !`);
          })
        } else self.callback = false;
      }, 500);
    },
    startTimer(start){
      let temps = start * 60
      let self = this;
      setInterval(() => {
        let minutes = parseInt(temps / 60, 10)
        let secondes = parseInt(temps % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        secondes = secondes < 10 ? "0" + secondes : secondes

        self.timer = `${minutes}:${secondes}`
        temps = temps <= 0 ? 0 : temps - 1
        if (temps === 0) self.timer = 'Coming !';
      }, 1000)
    },
    displayWindow(path){
      this.snackbarText = `Wait few seconds... and please select variables in select bar !`;
      this.snackbar = true;
      this.$router.push(path);
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Nunito&family=Work+Sans&display=swap%27');
@import '@/../public/css/App.css';
</style>