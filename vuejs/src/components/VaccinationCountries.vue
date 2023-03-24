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
         <v-col v-if="countries && countries.length > 0" cols="auto" align-self="center">
           <v-select color="#A5E65A" dark :items="countries" label="Region" v-model="selectedCountry" @change="updateBoxChart" style="max-width: 150px;" />
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
             mdi-chart-bar
           </v-icon>
         </v-col>
         <v-col class="pb-0" cols="auto" align-self="center">
            <span class="select-bar">
                Vaccinations repartition per countries
            </span>
         </v-col>
       </v-row>
     </v-banner>

     <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
       <v-row>
         <v-col cols="12" align="center" style="width: 100%; ">
           <JSCharting v-if="!loading && chartOptions.series[0].points && chartOptions.series[0].points.length > 0" :options="chartOptions" style="width: 100%; height: 500px;"/>
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
             mdi-chart-bar
           </v-icon>
         </v-col>
         <v-col class="pb-0" cols="auto" align-self="center">
            <span class="select-bar">
                Each type of vaccines doses repartition per countries
            </span>
         </v-col>
       </v-row>
     </v-banner>

     <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
       <v-row>
         <v-col cols="12" align="center" style="width: 100%; ">
           <JSCharting v-if="!loading && chartOptions.series[1].points && chartOptions.series[1].points.length > 0" :options="chartOptions" style="width: 100%; height: 500px;"/>
           <Loading v-else color="#32D9CB" />
         </v-col>
       </v-row>
     </v-banner>
   </section>
 </v-container>
</template>

<script>
import axios from "axios";
import JSCharting from "jscharting-vue";
import Loading from "@/components/Loading";

export default {
  name: "VaccinationCountries",
  data: () => ({
    countries: null,
    selectedCountry: null,
    loading: true,
    chartOptions: {
      defaultSeries_type: 'column',
      defaultSeries: {
        opacity: 0.7,
      },
      title: {
        position: 'center',
        label: {
          text: null,
          style: { fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat', color: '#5F7174' }
        }
      },
      legend: {
        template: null,
      },
      palette: ['#32D9CB', '#A5E65A', '#5F7174'],
      yAxis: {
        label_text: 'Logarithm'
      },
      xAxis: {
        label_text: null,
      },
      series: [
        {
          name: null,
          palette: ['#32D9CB', '#A5E65A', '#5F7174', '#FBC02D', '#EF6C00', '#BA68C8', '#2196F3', '#F44336', '#673AB7',
            '#00E676', '#FFC107', '#3F51B5', '#FF9800', '#9C27B0', '#8BC34A', '#9E9E9E', '#E91E63', '#795548', '#CDDC39', '#607D8B'],
          points: null
        }
      ]
    },
    chartOptions1: {
      defaultSeries_type: 'column',
      defaultSeries: {
        opacity: 0.7,
      },
      title: {
        position: 'center',
        label: {
          text: null,
          style: { fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat', color: '#5F7174' }
        }
      },
      legend: {
        template: null,
      },
      palette: ['#32D9CB', '#A5E65A', '#5F7174'],
      yAxis: {
        label_text: 'Logarithm'
      },
      xAxis: {
        label_text: null,
      },
      series: [
        {
          name: null,
          palette: ['#32D9CB', '#A5E65A', '#5F7174', '#FBC02D', '#EF6C00', '#BA68C8', '#2196F3', '#F44336', '#673AB7',
            '#00E676', '#FFC107', '#3F51B5', '#FF9800', '#9C27B0', '#8BC34A', '#9E9E9E', '#E91E63', '#795548', '#CDDC39', '#607D8B'],
          points: null
        }
      ]
    },
  }),
  components: {
    JSCharting,
    Loading,
  },
  methods: {
    updateBoxChart(){
      let self = this;
      this.loading = true;
      axios.get(`http://localhost:3000/vaccines/${this.selectedCountry}`).then(function (response) {
        //console.log(response.data.data);
        self.chartOptions.series[0].name = `Vaccines in ${self.selectedCountry !== undefined ? self.selectedCountry : null}`;
        self.chartOptions.xAxis.label_text = `Vaccines in ${self.selectedCountry !== undefined ? self.selectedCountry : null}`;
        self.chartOptions.title.label.text = `All vaccines repartition in ${self.selectedCountry !== undefined ? self.selectedCountry : null}`;
        self.chartOptions.series[0].points = response.data.data
        self.loading = false;
      }).catch(function (error) {
        console.log(error);
        self.loading = false;
      })
    },
  },
  mounted() {
    let self = this;
    axios.get('http://localhost:3000/countries').then(function (response) {
      //console.log(response);
      self.countries = response.data.data
      self.loading = false;
    }).catch(function (error) {
      console.log(error);
      self.loading = false;
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