<template>
  <v-container>
    <section class="Select">
      <v-banner color="#5F7174" rounded elevation="6">
        <v-row v-if="!loading">
          <v-col cols="auto" align-self="center">
            <v-icon color="#32D9CB" size="36">
              mdi-map-search
            </v-icon>
          </v-col>
          <v-col class="pb-1" cols="auto" align-self="center">
            <span class="select-bar">
                Select bar
            </span>
          </v-col>
          <v-spacer/>
          <v-col v-if="timeInterval && timeInterval.length > 0" cols="auto" align-self="center">
            <v-select color="#A5E65A" dark :items="timeInterval" label="Date" v-model="date" @change="updateMap" style="max-width: 100px;" />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" align="center" style="width: 100%;">
            <Loading color="#32D9CB" />
          </v-col>
        </v-row>
      </v-banner>
    </section>

    <v-divider class="my-10"/>

    <section class="Graph">
      <v-banner color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="auto" align-self="center">
            <v-icon color="#32D9CB" size="36">
              mdi-chart-scatter-plot
            </v-icon>
          </v-col>
          <v-col class="pb-0" cols="auto" align-self="center">
            <span class="select-bar">
                World Map of this dataset's cases by countries
            </span>
          </v-col>
        </v-row>
      </v-banner>

      <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="12" align="center" style="width: 100%; ">
            <JSCharting v-if="!loading && chartOptionsMap.series && chartOptionsMap.series.length > 0" :options="chartOptionsMap" style="width: 100%; height: 500px;"/>
            <Loading v-else color="#32D9CB" />
          </v-col>
        </v-row>
      </v-banner>

      <v-divider class="my-10"/>

      <v-banner color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="auto" align-self="center">
            <v-icon color="#32D9CB" size="36">
              mdi-chart-scatter-plot
            </v-icon>
          </v-col>
          <v-col class="pb-0" cols="auto" align-self="center">
            <span class="select-bar">
                World Map of this dataset's death by countries
            </span>
          </v-col>
        </v-row>
      </v-banner>

      <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="12" align="center" style="width: 100%; ">
            <JSCharting v-if="!loading && chartOptionsMap2.series && chartOptionsMap2.series.length > 0" :options="chartOptionsMap2" style="width: 100%; height: 500px;"/>
            <Loading v-else color="#32D9CB" />
          </v-col>
        </v-row>
      </v-banner>
    </section>
  </v-container>
</template>

<script>
import JSCharting from "jscharting-vue";
import Loading from "@/components/Loading";
import axios from "axios";

export default {
  name: "Map",
  data: () => ({
    loading: true,
    date: null,
    timeInterval: null,
    chartOptionsMap: {
      type: "map solid",
      mapping_base_layers: "europe",
      series: null
    },
    chartOptionsMap2: {
      type: "map solid",
      mapping_base_layers: "europe",
      series: null
    }
  }),
  components: {
    JSCharting,
    Loading,
  },
  methods: {
    async updateMap() {
      this.loading = true;
      let self = this;
      axios.get(`http://localhost:3000/WorldMap/${this.date}`).then(function (response) {
        let info = response.data.data.tab;
        info = info.filter(function(value){
          return value[1].cases !== undefined && value[1].death !== undefined;
        })
        const mapCodes = info.map(data => {
          return {
            map: "europe."+data[0],
            z: data[1].cases.weekly_count
          };
        });
        let maxC = 0;
        let maxD = 0;
        for(let num in info){
          if(info[num][1].cases.weekly_count > maxC){
            maxC = info[num][1].cases.weekly_count;
          }
          if(info[num][1].death.weekly_count > maxD){
            maxD = info[num][1].death.weekly_count;
          }
        }
        self.chartOptionsMap.series = [{points: [...mapCodes]}];
        self.chartOptionsMap.palette= {
          pointValue: function(p){
            return p.options('z');
          },
          stops: [
            [maxC/8, '#ffffe5'],
            [2*maxC/8, '#fff7bc'],
            [3*maxC/8, '#fee391'],
            [4*maxC/8, '#fec44f'],
            [5*maxC/8, '#ec7014'],
            [6*maxC/8, '#cc4c02'],
            [7*maxC/8, '#993404'],
            [maxC, '#662506']
          ],
          colorBar: {
            width: 20,
            axis_defaultTick_label: { text: '%value'}
          }
        };
        self.chartOptionsMap.debug = true;
        self.pointSelection = true;
        //###################################################
        const mapCodesDeath = info.map(data => {
          return {
            map: "europe."+data[0],
            z: data[1].death.weekly_count
          };
        });
        self.chartOptionsMap2.series = [{points: [...mapCodesDeath]}];
        self.chartOptionsMap2.palette= {
          pointValue: function(p){
            return p.options('z');
          },
          stops: [
            [maxD/8, '#aaa5cc'],
            [maxD, '#8511D1']
          ],
          colorBar: {
            width: 20,
            axis_defaultTick_label: { text: '%value'}
          }
        };
        self.chartOptionsMap2.debug = true;
        self.loading = false;
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted() {
    let self = this;
    axios.get('http://localhost:3000/intervals/COM/France').then(function (response) {
      self.timeInterval = response.data.data;
      self.loading = false;
    }).catch(function (error) {
      console.log(error);
    })
  }
}
</script>

<style scoped>
.select-bar{
  color: #A5E65A !important;
  font-size: 1.5em !important;
  font-family: "Montserrat Medium" !important;
  font-weight: bold !important;
  letter-spacing: 2px !important;
}
</style>