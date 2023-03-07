<template>
  <v-container>
    <section class="Title">
      <v-row class="mt-10" align="center" no-gutters>
        <v-col class="mb-16" align="center" no-gutters>
          <h1 class="page-title">Graphics</h1>
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
          <v-col v-if="timeInterval && timeInterval.length > 0" cols="auto" align-self="center">
            <v-select color="#A5E65A" dark :items="timeInterval" label="Interval start" v-model="selectedIntervalStart" style="max-width: 150px;" />
          </v-col>
          <v-col v-if="timeInterval && timeInterval.length > 0" cols="auto" align-self="center">
            <v-select color="#A5E65A" dark :items="timeInterval" label="Interval end" v-model="selectedIntervalEnd" style="max-width: 150px;" />
          </v-col>
          <v-col v-if="selectedCountry && selectedIntervalStart && selectedIntervalEnd" @click="updateVaccination" cols="auto" align-self="center">
            <v-btn fab text>
              <v-icon color="#A5E65A" size="30">
                mdi-magnify
              </v-icon>
            </v-btn>
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
              mdi-chart-arc
            </v-icon>
          </v-col>
          <v-col class="pb-1" cols="auto" align-self="center">
            <span class="select-bar">
                Regional cases and deaths
            </span>
          </v-col>
        </v-row>
      </v-banner>

      <v-banner class="mt-5" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="12" align="center" style="width: 100%;">
            <section class="Graph">
              <JSCharting :options="chartOptions" style="width: 100%; height: 500px;"/>
            </section>
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

      <v-banner class="mt-5" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="12" align="center" style="width: 100%; ">
            <JSCharting v-if="chartOptions1.series[0].points && chartOptions1.series[0].points.length > 0" :options="chartOptions1" style="width: 100%; height: 500px;"/>
            <Loading v-else color="#32D9CB" />
          </v-col>
        </v-row>
      </v-banner>
    </section>

  </v-container>
</template>

<script>
////chartOptions1.series[0].points && chartOptions1.series[0].points.length > 0
import JSCharting from 'jscharting-vue';
import Loading from "@/components/Loading";
import axios from "axios";

export default {
  name: 'Test',
  data: () => ({
    countries: null,
    selectedCountry: null,
    timeInterval: null,
    selectedIntervalStart: null,
    selectedIntervalEnd: null,
    chartOptions: {
      defaultSeries_type: 'radar polar',
      title: {
        position: 'center',
        label: {
          text: 'Time interval of deaths and cases per Region',
          style: { fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat', color: '#5F7174' }
        }
      },
      palette: ['#32D9CB', '#A5E65A'],
      yAxis_scale: { interval: 50, range_max: 150 },
      legend: { position: 'bottom', template: '%icon,%name' },
      defaultPoint: {
        marker: {
          type: 'circle',
          fill: 'white',
          outline_width: 2
        }
      },
      series: [
        {
          name: 'William',
          type: 'area spline',
          points: [
            { name: 'Jan', y: 59 },
            { name: 'Feb', y: 122 },
            { name: 'Mar', y: 57 },
            { name: 'Apr', y: 15 },
            { name: 'May', y: 111 },
            { name: 'Jun', y: 140 },
            { name: 'Jul', y: 67 },
            { name: 'Aug', y: 88 },
            { name: 'Sep', y: 90 },
            { name: 'Oct', y: 50 },
            { name: 'Nov', y: 77 },
            { name: 'Dec', y: 109 }
          ]
        },
        {
          name: 'Elliot',
          type: 'column',
          points: [
            { name: 'Jan', y: 79 },
            { name: 'Feb', y: 94 },
            { name: 'Mar', y: 93 },
            { name: 'Apr', y: 60 },
            { name: 'May', y: 7 },
            { name: 'Jun', y: 83 },
            { name: 'Jul', y: 94 },
            { name: 'Aug', y: 66 },
            { name: 'Sep', y: 94 },
            { name: 'Oct', y: 68 },
            { name: 'Nov', y: 81 },
            { name: 'Dec', y: 65 }
          ]
        }
      ]
    },
    chartOptions1: {
      type: 'area spline',
      title: {
        position: 'center',
        label: {
          text: 'Vaccination and accumulative cases number',
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
          name: 'Vaccinations number',
          points: null
        },
        {
          name: 'Cases number',
          points: null
        }
      ]
    }
  }),
  components: {
    JSCharting,
    Loading,
  },
  methods:{
    async updateVaccination(){
      const checkIntervalInfYears = this.selectedIntervalStart.substring(0, 4) < this.selectedIntervalEnd.substring(0, 4)
      const checkIntervalEqualYears = this.selectedIntervalStart.substring(0, 4) === this.selectedIntervalEnd.substring(0, 4)
      const checkIntervalWeek = this.selectedIntervalStart.substring(6, 8) < this.selectedIntervalEnd.substring(6, 8)
      if (checkIntervalInfYears || (checkIntervalEqualYears && checkIntervalWeek)){
        let self = this;
        await axios.get(`http://localhost:3000/vaccination/${this.selectedCountry}/${this.selectedIntervalStart}/${this.selectedIntervalEnd}`).then(function (response) {
          console.log(response.data);
          self.countries = response.data.data.countries
          self.timeInterval = response.data.data.interval
          self.chartOptions1.series[0].points = response.data.data.vaccinationsValues;
          self.chartOptions1.series[1].points = response.data.data.cumulatedCasesValues;
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
  },
  mounted() {
    let self = this;
    axios.get('http://localhost:3000/vaccination/null/null/null').then(function (response) {
      console.log(response.data);
      self.countries = response.data.data.countries
      self.timeInterval = response.data.data.interval
    }).catch(function (error) {
      console.log(error);
    })
  }
};
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