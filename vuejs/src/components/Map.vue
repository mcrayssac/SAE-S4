<template>
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
                World Map of this dataset's cases by countries
            </span>
        </v-col>
      </v-row>
    </v-banner>

    <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
      <v-row>
        <v-col cols="12" align="center" style="width: 100%; ">
          <JSCharting v-if="!loading" :options="chartOptionsMap" style="width: 100%; height: 500px;"/>
          <Loading v-else color="#32D9CB" />
        </v-col>
      </v-row>
    </v-banner>

    <v-divider class="my-10"/>

    <v-banner color="#5F7174" rounded elevation="6">
      <v-row>
        <v-col cols="auto" align-self="center">
          <v-icon color="#32D9CB" size="36">
            mdi-chart-scatter-plot
          </v-icon>
        </v-col>
        <v-col class="pb-0" cols="auto" align-self="center">
            <span class="select-bar">
                World Map of this dataset's death by countries
            </span>
        </v-col>
      </v-row>
    </v-banner>

    <v-banner class="mt-5 pe-3" color="#5F7174" rounded elevation="6">
      <v-row>
        <v-col cols="12" align="center" style="width: 100%; ">
          <JSCharting v-if="!loading" :options="chartOptionsMap2" style="width: 100%; height: 500px;"/>
          <Loading v-else color="#32D9CB" />
        </v-col>
      </v-row>
    </v-banner>
  </section>
</template>

<script>
import JSCharting from "jscharting-vue";
import Loading from "@/components/Loading";
import axios from "axios";

export default {
  name: "Map",
  data: () => ({
    loading: true,
    chartOptionsMap: {
      type: "map solid",
      mapping_base_layers: "europe",
      series: null
    },
    chartOptionsMap2: {
      type: "map solid",
      mapping_base_layers: "europe",
      series: null
    }
  }),
  components: {
    JSCharting,
    Loading,
  },
  mounted() {
    let self = this;
    axios.get(`http://localhost:3000/WorldMap`).then(function (response) {
      const info = response.data.data.tab;
      const mapCodes = info.map(data => {
        return {
          map: "europe."+data[0],
          z: data[1].cases.weekly_count
        };
      });
      self.chartOptionsMap.series = [{points: [...mapCodes]}];
      self.chartOptionsMap.palette= {
        pointValue: function(p){
          return p.options('z');
        },
        stops: [
          //[1000, '#858ED1'],
          [2000, '#ffffe5'],
          [5000, '#fff7bc'],
          [10000, '#fee391'],
          [25000, '#fec44f'],
          [50000, '#ec7014'],
          [75000, '#cc4c02'],
          [100000, '#993404'],
          [200000, '#662506']
        ],
        colorBar: {
          width: 20,
          axis_defaultTick_label: { text: '%value'}
        }
      };
      self.chartOptionsMap.debug = true;
      self.pointSelection = true;
      self.loading = false;
      //###################################################
      const mapCodesDeath = info.map(data => {
        return {
          map: "europe."+data[0],
          z: data[1].death.weekly_count
        };
      });
      self.chartOptionsMap2.series = [{points: [...mapCodesDeath]}];
      self.chartOptionsMap2.palette= {
        pointValue: function(p){
          return p.options('z');
        },
        stops: [
          [500, '#AD8ED1'],
          [1000, '#9A8ED1'],
          [1500, '#858ED1'],
          [2000, '#658ED1'],
          [3000, '#458ED1'],
          [4000, '#238ED1'],
          [5000, '#138ED1'],
          [6000, '#008ED1']
        ],
        colorBar: {
          width: 20,
          axis_defaultTick_label: { text: '%value'}
        }
      };
      self.chartOptionsMap2.debug = true;
    }).catch(function (error) {
      console.log(error);
    });
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