<template>
  <v-container>
    <section class="Title">
      <v-row class="mt-10" align="center" no-gutters>
        <v-col class="mb-16" align="center" no-gutters>
          <h1 class="page-title">Test</h1>
        </v-col>
      </v-row>
    </section>

    <section class="Graph">
      <JSCharting :options="chartOptions" class="columnChart"/>
    </section>
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
            { x: 'A', y: 50 },
            { x: 'B', y: 30 },
            { x: 'C', y: 50 }
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