<template>
  <v-app class="app">
    <section class="NavBar">
      <v-app-bar app color="#5F7174" dark elevate-on-scroll>
        <v-app-bar-nav-icon class="bar-icon" @click="drawer = true" color="#D6FFF6"></v-app-bar-nav-icon>
        <v-toolbar-title><span class="toolbar-title-left">Belfort </span><span class="toolbar-title-right">Analytica</span></v-toolbar-title>
        <v-spacer />
        <v-btn text fab @click="$router.push('/')">
          <v-icon color="#A5E65A" size="30">
            mdi-home
          </v-icon>
        </v-btn>
        <v-btn text fab @click="$router.push('/graphics')">
          <v-icon color="#32D9CB" size="30">
            mdi-poll
          </v-icon>
        </v-btn>
        <v-btn text fab @click="dataRefresh">
          <v-icon color="#32D9CB" size="30">
            mdi-file-refresh
          </v-icon>
        </v-btn>
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
        <router-view/>
      </v-main>
    </section>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    refresh: false,
  }),
  methods:{
    async dataRefresh() {
      await axios.get('http://localhost:3000/refresh').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.log(error.data);
      })
    }
  }
};
</script>

<style>
@import '@/../public/css/App.css';
</style>