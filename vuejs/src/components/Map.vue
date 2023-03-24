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
                World Map of this dataset's countries
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
  }),
  components: {
    JSCharting,
    Loading,
  },
  methods: {
    async selectionChange(){
      console.log("there's a psycho in my heeeeeeeaaaaaaaaaaaaaaaaaaaaaaaaaaad");
    }
  },
  mounted() {
    let self = this;
    axios.get(`http://localhost:3000/WorldMap`).then(function (response) {
      // on veut pour chaque pays les cas et les morts cumulé sur un intervalle donnée
      const info = response.data.data.tab;
      const mapCodes = info.map(data => {
        return {
          map: "europe."+data[0]
          //label_text: data[1].cases.YearWeekISO+","+data[1].cases.weekly_count
        };
      });
      self.chartOptionsMap.series = [{points: [...mapCodes], color: "##858ED1"}];
      self.chartOptionsMap.debug = true;
      self.chartOptionsMap.events_pointSelectionChanged = self.selectionChange();
      self.pointSelection = true;
      self.loading = false;
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