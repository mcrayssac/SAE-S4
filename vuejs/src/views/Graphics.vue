<template>
  <v-container>
    <section class="Title">
      <v-row class="mt-10" align="center" no-gutters>
        <v-col class="mb-16" align="center" no-gutters>
          <h1 class="page-title">Graphics</h1>
        </v-col>
      </v-row>
    </section>

    <section class="Graph">
      <v-banner color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="auto" align-self="center">
            <v-icon color="#32D9CB" size="36">
              mdi-poll
            </v-icon>
          </v-col>
          <v-col class="pb-1" cols="auto" align-self="center">
            <span class="select-bar">
                Here our title
            </span>
          </v-col>
        </v-row>
      </v-banner>

      <v-banner class="mt-5" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="auto" align-self="center" style="width: 100%; height: 500px;">
            <section class="Graph">
              <JSCharting :options="chartOptions" style="width: 100%; height: 100%;"/>
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
              mdi-poll
            </v-icon>
          </v-col>
          <v-col class="pb-0" cols="auto" align-self="center">
            <span class="select-bar">
                Vaccinations and cases number
            </span>
          </v-col>
          <v-spacer/>
          <v-col v-if="countries" class="pb-1" cols="auto" align-self="center">
            <v-select color="white" dark :items="countries" label="Region" v-model="selectedCountry" @change="updateVaccination()" style="max-width: 100px;" />
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
    chartOptions: {
      type: 'horizontal column',
      series: [
        {
          points: [
            {x: 'A', y: 50},
            {x: 'B', y: 30},
            {x: 'C', y: 50}
          ]
        }
      ]
    },
    chartOptions1: {
      type: 'area spline',
      legend_visible: true,
      legend_position: 'inside top left',
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
      let self = this;
      await axios.get(`http://localhost:3000/vaccination/${self.selectedCountry}`).then(function (response) {
        console.log(response.data);
        self.countries = response.data.data.countries
        self.chartOptions1.series[0].points = response.data.data.data;
        self.chartOptions1.series[1].points = response.data.data.data2;
      }).catch(function (error) {
        console.log(error);
      })
    }
  },
  mounted() {
    let self = this;
    axios.get('http://localhost:3000/vaccination/null').then(function (response) {
      console.log(response.data);
      self.countries = response.data.data.countries
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