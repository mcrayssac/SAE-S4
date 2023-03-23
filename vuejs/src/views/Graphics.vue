<template>
  <v-container>
    <section class="Title">
      <v-row class="mt-10" align="center" no-gutters>
        <v-col class="mb-16" align="center" no-gutters>
          <h1 class="page-title">Data Visualization</h1>
        </v-col>
      </v-row>
    </section>

    <v-row align="center">
      <v-item-group v-model="window" class="shrink mr-6 group-button" mandatory tag="v-flex">
        <v-item v-for="(item, index) in length" :key="index" v-slot="{ active, toggle }">
          <div>
            <v-tooltip color="#5F7174" right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn x-large v-bind="attrs" v-on="on" :input-value="active" icon @click="toggle">
                  <v-icon color="white" v-if="active" large>{{ item.icon }}</v-icon>
                  <v-icon color="#5F7174" v-else>mdi-record</v-icon>
                </v-btn>
              </template>
              <span class="tooltip-text">{{ item.tooltip }}</span>
            </v-tooltip>
          </div>
        </v-item>
      </v-item-group>

      <v-col>
        <v-window v-model="window" class="elevation-1" vertical>
          <v-window-item>
            <RegionalVaccinationCasesDeaths/>
          </v-window-item>
          <v-window-item>
            <DataVisualizationRelation/>
          </v-window-item>
          <v-window-item>
            <Map/>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import RegionalVaccinationCasesDeaths from "@/components/RegionalVaccinationCasesDeaths";
import Map from "@/components/Map";
import DataVisualizationRelation from "@/components/DataVisualizationRelation";

export default {
  name: 'Test',
  data: () => ({
    length: [
      {tooltip: "Regional vaccination cases deaths", icon: "mdi-bacteria-outline"},
      {tooltip: "Relation between vaccinations and cases", icon: "mdi-virus-outline"},
      {tooltip: "World Map of this dataset's countries", icon: "mdi-map-search"},
    ],
    window: 0,
  }),
  components: {
    RegionalVaccinationCasesDeaths,
    Map,
    DataVisualizationRelation,
  },
  computed: {

  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style scoped>
.group-button{
  position: fixed;
  left: 1%;
  top: 50%;
  bottom: 50%;
}

.tooltip-text{
  color: white !important;
  font-size: 1em !important;
  font-family: "Roboto", sans-serif !important;
  font-weight: bold !important;
  letter-spacing: 1px !important;
}
</style>