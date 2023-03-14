<template>
  <v-container>
    <section class="Title">
      <v-row class="mt-10" align="center" no-gutters>
        <v-col class="mb-16" align="center" no-gutters>
          <h1 class="page-title">Predictions</h1>
        </v-col>
      </v-row>
    </section>

    <section class="Select">
      <v-banner color="#5F7174" rounded elevation="6">
        <v-row>
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
          <v-col v-if="countries && countries.length > 0" cols="auto" align-self="center">
            <v-select color="#A5E65A" dark :items="countries" label="Region" v-model="selectedCountry" style="max-width: 150px;" />
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
              mdi-chart-bell-curve-cumulative
            </v-icon>
          </v-col>
          <v-col class="pb-0" cols="auto" align-self="center">
            <span class="select-bar">
                Regional vaccinations and cases
            </span>
          </v-col>
        </v-row>
      </v-banner>

      <v-divider class="my-10"/>

      <v-banner>
        <v-row>
          <v-col>
            <v-slider min="0.1" max="3" v-model="transmission" step="0.001" thumb-label="always" label="Transmission">Transmission</v-slider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-slider min="0.1" max="3" v-model="duration" step="0.001" thumb-label="always" label="Duration">Duration</v-slider>
          </v-col>
          <v-col v-if="selectedCountry && transmission && duration" @click="updatePrediction" cols="auto" align-self="center">
            <v-btn fab text>
              <v-icon color="#A5E65A" size="30">
                mdi-magnify
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-banner>
      <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="12" align="center" style="width: 100%; ">
            <JSCharting v-if="chartOption0.series[0].points && chartOption0.series[1].points.length > 0" :options="chartOption0" style="width: 100%; height: 500px;"/>
            <Loading v-else color="#32D9CB" />
          </v-col>
        </v-row>
      </v-banner>
    </section>
  </v-container>
</template>

<script>
import Loading from "@/components/Loading";
import axios from "axios";

export default {
  name: "Predictions",
  data: () => ({
    countries: null,
    selectedCountry: null,
    transmission: null,
    duration: null,
    chartOption0: {
      type: 'area spline',
      title: {
        position: 'center',
        label: {
          text: 'Prediction on the number of safe, cases and dead/healed for the population',
          style: { fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat', color: '#5F7174' }
        }
      },
      legend: {
        template: '%icon %name',
        position: 'top right'
      },
      palette: ['#32D9CB', '#A5E65A'],
      defaultSeries: {
        shape_opacity: 0.2,
        defaultPoint_marker: {
          size: 0
        }
      },
      xAxis: {
        scale_type: 'auto',
        crosshair_enabled: true,
        defaultTick: {
          label_rotate: -90
        }
      },
      yAxis: [
        {
          scale_type: 'auto',
        }
      ],
      series: [
        {
          name: 'Cases Number',
          points: null
        },
        {
          name: 'Removed number',
          points: null
        },
        {
          name: 'Safe Number',
          points: null
        }
      ]
    }
  }),
  components: {
    Loading,
  },
  mounted() {
    let self = this;
    axios.get('http://localhost:3000/vaccination/null/null/null').then(function (response) {
      //console.log(response.data);
      self.countries = response.data.data.countries
      self.timeInterval = response.data.data.interval
    }).catch(function (error) {
      console.log(error);
    })
  },
  methods: {
    async updatePrediction(){
      await axios.get(`http://localhost:3000/prediction/${this.selectedCountry}/${this.transmission}/${this.duration}`).then(function (response) {
        console.log(response.data);
        self.countries = response.data.data.countries
        self.timeInterval = response.data.data.interval
        self.chartOption0.series[0].points = response.data.data.infected;
        self.chartOption0.series[1].points = response.data.data.removed;
        self.chartOption0.series[2].points = response.data.data.notSick;
      }).catch(function (error) {
        console.log(error);
      })
    }
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