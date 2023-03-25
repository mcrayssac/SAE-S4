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
          <v-col v-if="vaccines && vaccines.length > 0" cols="auto" align-self="center">
            <v-select color="#A5E65A" dark :items="vaccines" label="Vaccines" v-model="selectedVaccine" style="max-width: 90px;" @change="updateCountries" />
          </v-col>
          <v-col v-if="countries && countries.length > 0" cols="auto" align-self="center">
            <v-select color="#A5E65A" dark :items="countries" label="Region" v-model="selectedCountry" style="max-width: 100px;" @change="updateVaccination"/>
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
                Regional relation between vaccinations and cases
            </span>
          </v-col>
        </v-row>
      </v-banner>

      <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="12" align="center" style="width: 100%; ">
            <JSCharting v-if="chartOptions3.series[0].points && chartOptions3.series[0].points.length > 0" :options="chartOptions3" style="width: 100%; height: 500px;"/>
            <Loading v-else color="#32D9CB" />
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
                COVID-19 European Heatmap
            </span>
          </v-col>
        </v-row>
      </v-banner>

      <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="12" align="center" style="width: 100%; ">
            <JSCharting v-if="chartHeatmap.series[0].points && chartHeatmap.series[0].points.length > 0" :options="chartHeatmap" style="width: 100%; height: 500px;"/>
            <Loading v-else color="#32D9CB" />
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
                COVID-19 European Heatmap (fully detailed)
            </span>
    </v-col>
  </v-row>
</v-banner>

<v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
  <v-row>
    <v-col cols="12" align="center" style="width: 100%; ">
      <JSCharting v-if="chartHeatmap2.series[0].points && chartHeatmap2.series[0].points.length > 0" :options="chartHeatmap2" style="width: 100%; height: 500px;"/>
      <Loading v-else color="#32D9CB" />
    </v-col>
  </v-row>
</v-banner>
</section>
</v-container>
</template>

<script>
import JSCharting from 'jscharting-vue';
import Loading from "@/components/Loading";
import axios from "axios";

export default {
  name: "DataVisualizationRelation",
  data: () => ({
    vaccines: null,
    selectedVaccine: null,
    countries: null,
    selectedCountry: null,
    loading: false,
    chartOptions3: {
      type: 'marker',
      title: {
        position: 'center',
        label: {
          text: 'Relation between COVID cases and vaccines administered',
          style: { fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat', color: '#5F7174' }
        }
      },
      defaultPoint: {
        tooltip: '<b>Week: %name</b><br>Deaths per week: <b>%xValue</b><br>Cumulated vaccinations: <b>%yValue</b>\'',
        opacity: 0.7,
        marker:{
          type: 'circle',
          outline_width:0,
          size:12
        }
      },
      axisToZoom: 'xy',
      legend_visible: false,
      palette: ['#32D9CB', '#A5E65A'],
      legend: {
        template: '%icon %name',
        position: 'top right'
      },
      series: [
        {
          points: null
        }
      ]
    },
    chartHeatmap: {
      type: "heatmap solid",
      debug: true,
      annotations: [
        {
          label: {
            text: 'COVID-19 situation in Europe<br>Results by vaccine and country (2020-2023)',
            style_fontSize: 16
          },
          position: 'top left'
        }
      ],
      defaultPoint: {
        outline: { color: '#5F7174', width: 1 },
        tooltip: '<b>%date</b> <br>Target group : <b>%ageRange</b><br>COVID cases : <b>%cases</b>'
      },
      legend: {
        template: '%icon %name',
        position: 'top right',
        layout: 'horizontal'
      },
      series: [{points: null}],
      scaleVisible: false
    },
    chartHeatmap2: {
      type: "heatmap solid",
      debug: true,
      annotations: [
        {
          label: {
            text: 'COVID-19 situation in Europe<br>Results by vaccine and country (2020-2023)',
            style_fontSize: 16
          },
          position: 'top left'
        }
      ],
      defaultPoint: {
        outline: { color: '#5F7174', width: 1 },
        tooltip: '<b>%date</b> <br>Target group : <b>%ageRange</b><br>COVID cases : <b>%cases</b>'
      },
      legend: {
        template: '%icon %name',
        position: 'top right',
        layout: 'horizontal'
      },
      series: [{points: null}],
      scaleVisible: false
    }
  }),
  components: {
    JSCharting,
    Loading,
  },
  methods: {
    async updateCountries(){
      let self = this;
      this.loading = true;
      await axios.get(`http://localhost:3000/countries/${this.selectedVaccine}`).then(function (response) {
        self.loading = false;
        self.countries = response.data.data;
      }).catch(function (error) {
        console.log(error);
        self.loading = false;
      })
    },
    async updateVaccination(){
      let self = this;
      this.loading = true;
      await axios.get(`http://localhost:3000/relation/${this.selectedVaccine}/${this.selectedCountry}`).then(function (response) {
        //console.log(response);
        self.loading = false;
        self.chartOptions3.series[0].points = response.data.data.relation;
      }).catch(function (error) {
        console.log(error);
        self.loading = false;
      })
      await axios.get(`http://localhost:3000/heatmap/${this.selectedVaccine}`).then(function (response) {
        console.log(response.data.data[0]);
        self.loading = false;
        self.chartHeatmap.series[0].points = response.data.data;
      }).catch(function (error) {
        console.log(error);
        self.loading = false;
      })
      await axios.get(`http://localhost:3000/heatmap2/${this.selectedVaccine}`).then(function (response) {
        console.log(response.data.data[0]);
        self.loading = false;
        self.chartHeatmap2.series[0].points = response.data.data;
      }).catch(function (error) {
        console.log(error);
        self.loading = false;
      })
    }
  },
  mounted() {
    let self = this;
    axios.get('http://localhost:3000/vaccines').then(function (response) {
      self.vaccines = response.data.data;
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