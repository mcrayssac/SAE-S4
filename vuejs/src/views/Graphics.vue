<template>
  <v-container>
    <section class="Title">
      <v-row class="mt-10" align="center" no-gutters>
        <v-col class="mb-16" align="center" no-gutters>
          <h1 class="page-title">Data Visualization</h1>
        </v-col>
      </v-row>
    </section>

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
            <v-select color="#A5E65A" dark :items="countries" label="Region" v-model="selectedCountry" style="max-width: 100px;" @change="updateInterval"/>
          </v-col>
          <v-col v-if="timeInterval && timeInterval.length > 0" cols="auto" align-self="center">
            <v-select color="#A5E65A" dark :items="timeInterval" label="Interval start" v-model="selectedIntervalStart" style="max-width: 100px;" />
          </v-col>
          <v-col v-if="timeInterval && timeInterval.length > 0" cols="auto" align-self="center">
            <v-select color="#A5E65A" dark :items="timeInterval" label="Interval end" v-model="selectedIntervalEnd" style="max-width: 100px;" />
          </v-col>
          <v-col v-if="selectedCountry && selectedIntervalStart && selectedIntervalEnd" @click="updateVaccination" cols="auto" align-self="center">
            <v-btn fab text>
              <v-icon color="#A5E65A" size="30">
                mdi-magnify
              </v-icon>
            </v-btn>
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

      <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
        <v-row v-if="chartOptions.series[0].points && chartOptions.series[0].points.length > 0 && chartOptions1.series[0].points && chartOptions1.series[0].points.length > 0" style="background-color: white">
          <v-col class="pe-0" cols="6" align="center" style="width: 100%;">
            <JSCharting :options="chartOptions" style="width: 100%; height: 500px;"/>
          </v-col>
          <v-col class="ps-0" cols="6" align="center" style="width: 100%;">
            <JSCharting :options="chartOptions1" style="width: 100%; height: 500px;"/>
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

      <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="12" align="center" style="width: 100%; ">
            <JSCharting v-if="chartOptions2.series[0].points && chartOptions2.series[0].points.length > 0" :options="chartOptions2" style="width: 100%; height: 500px;"/>
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
              mdi-chart-bell-curve-cumulative
            </v-icon>
          </v-col>
          <v-col class="pb-0" cols="auto" align-self="center">
            <span class="select-bar">
                Total regional vaccinations and cases
            </span>
          </v-col>
        </v-row>
      </v-banner>

      <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="12" align="center" style="width: 100%; ">
            <JSCharting v-if="chartOptions4.series[0].points && chartOptions4.series[0].points.length > 0" :options="chartOptions4" style="width: 100%; height: 500px;"/>
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
                World Map of this dataset's countries
            </span>
          </v-col>
        </v-row>
      </v-banner>

      <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="12" align="center" style="width: 100%; ">
            <JSCharting :options="chartHeatmap" style="width: 100%; height: 500px;"/>
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
                World Map of this dataset's countries
            </span>
          </v-col>
        </v-row>
      </v-banner>

      <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="12" align="center" style="width: 100%; ">
            <JSCharting :options="chartOptionsMap" style="width: 100%; height: 500px;"/>
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
  name: 'Test',
  data: () => ({
    vaccines: null,
    selectedVaccine: null,
    countries: null,
    selectedCountry: null,
    timeInterval: null,
    selectedIntervalStart: null,
    selectedIntervalEnd: null,
    loading: false,
    chartOptions: {
      defaultSeries_type: 'radar polar area',
      defaultSeries: {
        shape_opacity: 0.2,
        defaultPoint_marker: {
          size: 6
        }
      },
      title: {
        position: 'center',
        label: {
          text: 'Time interval of cases per Region',
          style: { fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat', color: '#5F7174' }
        }
      },
      palette: ['#32D9CB'],
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
          name: 'Cases values',
          points: null
        },
      ]
    },
    chartOptions1: {
      defaultSeries_type: 'radar polar column',
      defaultSeries: {
        opacity: 0.7,
      },
      title: {
        position: 'center',
        label: {
          text: 'Time interval of deaths per Region',
          style: { fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat', color: '#5F7174' }
        }
      },
      palette: ['#A5E65A'],
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
          name: 'Deaths values',
          points: null
        },
      ]
    },
    chartOptions2: {
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
    },
    chartOptions4: {
      type: 'area spline',
      title: {
        position: 'center',
        label: {
          text: 'Total Vaccination and accumulative cases number',
          style: { fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat', color: '#5F7174' }
        }
      },
      legend: {
        template: '%icon %name',
        position: 'top right'
      },
      palette: ['#32D9CB', '#A5E65A', '#ff0000'],
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
          name: 'Total Vaccination number',
          points: null
        },
        {
          name: 'Cases number',
          points: null
        },
        {
          name: 'Deaths number',
          points: null
        }
      ]
    },
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
        opacity: 0.8,
        marker: {
          type: 'circle',
          outline_width: 0,
          size: 12
        }
      },
      palette: ['#32D9CB', '#A5E65A'],
      axisToZoom: 'xy',
      legend: {
        template: '%icon %name',
        position: 'top right'
      },
      yAxis: {
        scale_type: 'auto',
      },
      xAxis: {
        scale_type: 'auto',
        crosshair_enabled: true
      },
      series: [
        {
          name: 'Relation Vaccination/Cases',
          points: null
        }
      ]
    },
    chartOptionsMap: {
      type: "map solid",
      mapping_base_layers: "US",
      series: null
    },
    chartHeatmap: {
      type: "heatmap solid",
      annotations: [
        {
          label: {
            text: 'COVID-19 situation in Europe<br>Results by country (2020-2023)',
            style_fontSize: 16
          },
          position: 'top left'
        }
      ],
      defaultAxis: {
        defaultTick: {
          line_visible: false,
          gridLine_visible: false
        },
        line_visible: false
      },
      xAxis: [
        {
          /* The main axis */
          id: 'x1',
          orientation: 'top',
          defaultTick_label: {
            text: '<b>%value</b>',
            offset: '8,5'
          },
          scale_interval: { unit: 'YearWeekISO', multiplier: 4 }
        }
      ],
      yAxis: {
        scale_invert: true,
        line_visible: false,
        defaultTick_label_offset: '4,0'
      },
      defaultPoint: {
        legendEntry_visible: false,
        outline: { color: 'white', width: 2 }
      },
      toolbar_visible: false,
      legend: {
        template: '%icon %name',
        position: 'top right',
        layout: 'vertical'
      },
      series: null
    }
  }),
  components: {
    JSCharting,
    Loading,
  },
  methods:{
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
    async updateInterval(){
      let self = this;
      this.loading = true;
      await axios.get(`http://localhost:3000/intervals/${this.selectedVaccine}/${this.selectedCountry}`).then(function (response) {
        self.loading = false;
        self.timeInterval = response.data.data;
      }).catch(function (error) {
        console.log(error);
        self.loading = false;
      })
    },
    async updateVaccination(){
      const checkIntervalInfYears = this.selectedIntervalStart.substring(0, 4) < this.selectedIntervalEnd.substring(0, 4)
      const checkIntervalEqualYears = this.selectedIntervalStart.substring(0, 4) === this.selectedIntervalEnd.substring(0, 4)
      const checkIntervalWeek = this.selectedIntervalStart.substring(6, 8) < this.selectedIntervalEnd.substring(6, 8)
      if (checkIntervalInfYears || (checkIntervalEqualYears && checkIntervalWeek)){
        let self = this;
        this.loading = true;
        await axios.get(`http://localhost:3000/visualization/${this.selectedVaccine}/${this.selectedCountry}/${this.selectedIntervalStart}/${this.selectedIntervalEnd}`).then(function (response) {
          //console.log(response);
          self.loading = false;
          self.chartOptions4.series[0].points = response.data.data.totalVaccinationValues;
          self.chartOptions4.series[1].points = response.data.data.cumulatedCasesValues;
          self.chartOptions4.series[2].points = response.data.data.cumulatedDeathsValues;
          /*self.countries = response.data.data.countries
          self.timeInterval = response.data.data.interval
          self.chartOptions4.series[0].points = response.data.data.totalVaccinationValues;
          self.chartOptions4.series[1].points = response.data.data.cumulatedCasesValues;
          self.chartOptions4.series[2].points = response.data.data.cumulatedDeathsValues;
          self.chartOptions2.series[0].points = response.data.data.vaccinationsValues;
          self.chartOptions2.series[1].points = response.data.data.cumulatedCasesValues;
          self.chartOptions.series[0].points = response.data.data.casesValues;
          self.chartOptions1.series[0].points = response.data.data.deathsValues;*/
        }).catch(function (error) {
          console.log(error);
          self.loading = false;
        })
        await axios.get(`http://localhost:3000/relation/${this.selectedVaccine}/${this.selectedCountry}`).then(function (response) {
          console.log(response.data.data.renamedData);
          self.chartOptions3.series[0].points = response.data.data.renamedData;
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
  },
  mounted() {
    let self = this;
    axios.get('http://localhost:3000/vaccines').then(function (response) {
      self.vaccines = response.data.data;
    }).catch(function (error) {
      console.log(error);
    })

    /*axios.get(`http://localhost:3000/WorldMap`).then(function (response) {
      const codes = response.data.data.code;
      const mapCodes = codes.map(country => {
        return { map: country.toLowerCase() };
      });
      console.log([mapCodes]);
      //self.chartOptionsMap.series = [...mapCodes];
    }).catch(function (error) {
      console.log(error);
    });*/

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