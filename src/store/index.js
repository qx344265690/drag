import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.js";
import load from "./modules/loading.js";
import custom from "./modules/custom.js";
import getters from "./getters.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    load,
    custom
  },
  getters
});
