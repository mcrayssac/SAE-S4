<template>
  <v-container>
    <section class="Title">
      <v-row class="mt-10" align="center" no-gutters>
        <v-col class="mb-16" align="center" no-gutters>
          <h1 class="page-title">Test</h1>
        </v-col>
      </v-row>
    </section>

    <v-banner color="#5F7174" rounded elevation="6">
      <v-row>
        <v-col cols="auto" align-self="center">
          <v-icon color="#32D9CB" size="36">
            mdi-poll
          </v-icon>
        </v-col>
        <v-col class="pb-1" cols="auto" align-self="center">
          <v-tooltip bottom color="#2374AB">
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" class="select-bar">
                  Here our title
              </span>
            </template>
            <span class="tooltip-text">Boutique sélectionnée</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-banner>

    <v-banner class="mt-5" color="#5F7174" rounded elevation="6">
      <v-row>
        <v-col cols="auto" align-self="center">
          <section class="Graph">
            <JSCharting :options="chartOptions"/>
          </section>
        </v-col>
      </v-row>
    </v-banner>


  </v-container>
</template>

<script>
import JSCharting from 'jscharting-vue';

export default {
  name: 'Test',
  data: () => ({
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
    }
  }),
  components: {
    JSCharting
  }
};
</script>

<style scoped>
.tooltip-text{
  color: #D6FFF6 !important;
  font-size: 1em !important;
  font-family: "Montserrat Medium" !important;
  font-weight: bold !important;
  letter-spacing: 2px !important;
}

.select-bar{
  color: #A5E65A !important;
  font-size: 2em !important;
  font-family: "Montserrat Medium" !important;
  font-weight: bold !important;
  letter-spacing: 2px !important;
}
</style>