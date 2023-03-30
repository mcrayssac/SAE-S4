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
         <v-expansion-panel-header class="page-title2">SAE S4 de Data Visualisation sur le COVID-19</v-expansion-panel-header>
         <v-expansion-panel-content class="page-body">
           Face à l'impact sans précédent de la pandémie de COVID-19, la compréhension et la communication des données sont devenues plus importantes que jamais. Notre projet de data visualisation sur le COVID-19 a pour objectif de rendre les informations sur la pandémie accessibles, compréhensibles et exploitables pour tous.
         </v-expansion-panel-content>
       </v-expansion-panel>
       <v-expansion-panel class="expansion_panel">
         <v-expansion-panel-header class="page-title2">Notre approche</v-expansion-panel-header>
         <v-expansion-panel-content class="page-body">
           Nous avons rassemblé des données provenant de sources fiables et reconnues, telles que l'Organisation mondiale de la santé (OMS), les Centres de contrôle et de prévention des maladies (CDC) et les gouvernements nationaux. Notre équipe d'experts en visualisation de données a travaillé sans relâche pour concevoir des graphiques interactifs et intuitifs, permettant aux utilisateurs d'explorer les tendances et les détails de la pandémie de COVID-19.
         </v-expansion-panel-content>
       </v-expansion-panel>
       <v-expansion-panel class="expansion_panel">
         <v-expansion-panel-header class="page-title2">Principales fonctionnalités</v-expansion-panel-header>
         <v-expansion-panel-content class="page-body">
           <ul>
             <li>Carte mondiale interactive montrant le nombre de cas, de décès et de vaccinations par pays</li>
             <li>Graphiques animés illustrant l'évolution de la pandémie au fil du temps</li>
             <li>Comparaisons entre les pays pour analyser les différences d'approche et d'impact</li>
             <li>Zoom sur les variants du virus et leur prévalence dans le monde</li>
             <li>Outil de filtrage pour affiner les données par tranche d'âge, sexe et autres critères démographiques</li>
           </ul>
         </v-expansion-panel-content>
       </v-expansion-panel>
       <v-expansion-panel class="expansion_panel">
         <v-expansion-panel-header class="page-title2">Impact et utilité</v-expansion-panel-header>
         <v-expansion-panel-content class="page-body">
           Ce projet de data visualisation vise à éclairer les décisions des responsables politiques, des professionnels de la santé et du grand public. En rendant les informations sur le COVID-19 plus accessibles, nous espérons contribuer à une meilleure compréhension de la pandémie et à la prise de décisions éclairées pour lutter contre sa propagation.
           <br>
           <p class="pt-2">Nous vous invitons à explorer notre plateforme de data visualisation sur le COVID-19 et à partager ces informations avec votre entourage. Ensemble, nous pouvons mieux comprendre cette pandémie et œuvrer pour un avenir en meilleure santé.</p>
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
