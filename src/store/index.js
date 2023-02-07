import Vue from 'vue';
import Vuex from 'vuex';
import Study from './modules/Study';
import Calendar from './modules/Calendar';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    Study,
    Calendar,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
