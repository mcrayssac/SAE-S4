<template>
 <v-container>
  <section class="Title">
    <v-row class="mt-10" align="center" no-gutters>
      <v-col class="mb-16" align="center" no-gutters>
        <h1 class="page-title">Home</h1>
      </v-col>
    </v-row>
  </section>

   <v-row justify="center">
     <v-expansion-panels inset>
       <v-expansion-panel class="expansion_panel">
         <v-expansion-panel-header class="page-title2">SAE S4 : Data visualization project on the COVID-19 pandemic</v-expansion-panel-header>
         <v-expansion-panel-content class="page-body">
           With the unprecedented impact of the COVID-19 pandemic, understanding and communicating data has become more important than ever. Our COVID-19 data visualization project aims to make information about the pandemic accessible, understandable and usable for everyone.
         </v-expansion-panel-content>
       </v-expansion-panel>
       <v-expansion-panel class="expansion_panel">
         <v-expansion-panel-header class="page-title2">Our approach</v-expansion-panel-header>
         <v-expansion-panel-content class="page-body">
           After various searches to find data frames with a wide range of data, we gathered data from a reliable and reputable source, the European Center for Disease Prevention and Control (ECDC), a European Union agency established in 2005 whose mission is to strengthen Europe's defenses against infectious diseases.
           Our team of data visualization students worked tirelessly to design interactive and intuitive graphics, allowing users to explore
           trends and details of the COVID-19 pandemic from 2019 to the present day.
         </v-expansion-panel-content>
       </v-expansion-panel>
       <v-expansion-panel class="expansion_panel">
         <v-expansion-panel-header class="page-title2">Main features</v-expansion-panel-header>
         <v-expansion-panel-content class="page-body">
           <ul>
             <li>Interactive global map showing the number of cases, deaths and vaccinations by country</li>
             <li>Animated graphics showing the evolution of the pandemic over time</li>
             <li>Comparisons between vaccines to analyse differences in use according to dose type</li>
             <li>Filtering tool to refine data by age group, gender and other demographic criteria</li>
           </ul>
         </v-expansion-panel-content>
       </v-expansion-panel>
       <v-expansion-panel class="expansion_panel">
         <v-expansion-panel-header class="page-title2">Impact and benefits</v-expansion-panel-header>
         <v-expansion-panel-content class="page-body">
           This data visualisation project aims to inform the decisions of policy makers, health professionals and the general public. By making information about COVID-19 more accessible, we hope to contribute to a better understanding of the pandemic and to informed decisions to combat its spread.           <br>
           <p class="pt-2">We invite you to explore our COVID-19 data visualization platform and share this information with others. Together we can better understand this pandemic and work towards a healthier future</p>
         </v-expansion-panel-content>
       </v-expansion-panel>
     </v-expansion-panels>
   </v-row>

   <Home_Colors v-if="palette"/>
  </v-container>
</template>

<script>
  import Home_Colors from '../components/Home_Colors'

  export default {
    name: 'Home',
    data: () => ({
      palette: false
    }),
    components: {
      Home_Colors,
    },
  }
</script>

<style scoped>
@import '@/../public/css/Home.css';
</style>
