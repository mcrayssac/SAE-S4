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
          <v-col cols="auto" align-self="center" style="width: 100%; height: 100%;">
            <section class="Graph">
              <JSCharting :options="chartOptions"/>
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
          <v-col class="pb-1" cols="auto" align-self="center">
            <span class="select-bar">
                Here our title
            </span>
          </v-col>
        </v-row>
      </v-banner>

      <v-banner class="mt-5" color="#5F7174" rounded elevation="6">
        <v-row>
          <v-col cols="auto" align-self="center" style="width: 100%; height: 100%;">
            <section class="Graph">
              <JSCharting :options="chartOptions1"/>
            </section>
          </v-col>
        </v-row>
      </v-banner>
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
            {x: 'A', y: 50},
            {x: 'B', y: 30},
            {x: 'C', y: 50}
          ]
        }
      ]
    },
    chartOptions1: {
      type: 'area spline',
      legend_visible: false,
      defaultSeries: {
        shape_opacity: 0.3,
        color: '#6ec8cb',
        defaultPoint_marker: {
          type: 'linear/basic/magic-mouse',
          size: 15,
          outline: {color: 'white', width: 1.5}
        }
      },
      xAxis: {
        scale_type: 'date',
        crosshair_enabled: true,
        defaultTick: {
          label_rotate: -30
        }
      },
      yAxis: [
        {
          scale_type: 'auto',
          markers: [
            {
              value: [0, 3],
              label: {
                text: '<icon name=linear/ecommerce/graph-decrease size=15 verticalAlign=center margin_right=4> Peu de clics',
                style_fontSize: 14,
                align: 'center'
              },
              color: ['#d9231a', 0.5]
            },
            {
              value: (4+1+8+5+11)/5,
              label_text: '<icon name=linear/ecommerce/graph-increase size=15 verticalAlign=center margin_right=4> Moyenne de clics',
              label_style_fontSize: 13,
              line_width: 5,
              color: ['#495388', 0.5],
              label_align: 'left'
            }
          ]
        }
      ],
      series: [
        {
          name: 'Clics',
          points: [
              ['2022-04-04', 4],
              ['2022-04-05', 1],
              ['2022-04-06', 8],
              ['2022-04-07', 5],
              ['2022-04-08', 11],
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
.select-bar{
  color: #A5E65A !important;
  font-size: 2em !important;
  font-family: "Montserrat Medium" !important;
  font-weight: bold !important;
  letter-spacing: 2px !important;
}
</style>