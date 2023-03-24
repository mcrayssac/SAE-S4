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
           <v-select color="#A5E65A" dark :items="countries" label="Region" v-model="selectedCountry" style="max-width: 100px;" />
         </v-col>
         <v-col v-if="timeInterval && timeInterval.length > 0" cols="auto" align-self="center">
           <v-select color="#A5E65A" dark :items="timeInterval" label="Interval start" v-model="selectedIntervalStart" style="max-width: 100px;" />
         </v-col>
         <v-col v-if="timeInterval && timeInterval.length > 0" cols="auto" align-self="center">
           <v-select color="#A5E65A" dark :items="timeInterval" label="Interval end" v-model="selectedIntervalEnd" style="max-width: 100px;" />
         </v-col>
         <v-col v-if="selectedCountry && selectedIntervalStart && selectedIntervalEnd"  cols="auto" align-self="center">
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
             mdi-chart-bell-curve-cumulative
           </v-icon>
         </v-col>
         <v-col class="pb-0" cols="auto" align-self="center">
            <span class="select-bar">
                Regional vaccinations, cases and deaths
            </span>
         </v-col>
       </v-row>
     </v-banner>

     <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
       <v-row>
         <v-col cols="12" align="center" style="width: 100%; ">
           <Loading color="#32D9CB" />
         </v-col>
       </v-row>
     </v-banner>
   </section>

   <v-divider class="my-10"/>
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
    timeInterval: null,
    selectedIntervalStart: null,
    selectedIntervalEnd: null,
    loading: false,
  }),
  components: {
    // eslint-disable-next-line
    JSCharting,
    Loading,
  },
  methods: {
    updateBoxChart(){
      let self = this;
      axios.get('http://localhost:3000/countries').then(function (response) {
        //console.log(response);
        self.countries = response.data.data
      }).catch(function (error) {
        console.log(error);
      })
    },
  },
  mounted() {
    let self = this;
    axios.get('http://localhost:3000/countries').then(function (response) {
      //console.log(response);
      self.countries = response.data.data
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