import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataUpdate: null,
    dataUpdateValue: null,
  },
  getters: {
  },
  mutations: {
    setDataUpdate: function (state, dataUpdate){
      state.dataUpdate = dataUpdate;
    },
    setDataUpdateValue: function (state, value){
      state.dataUpdateValue = value;
    },
  },
  actions: {
  },
  modules: {
  }
})
