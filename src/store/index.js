import Vue from 'vue';
import Vuex from 'vuex';
import * as user from './modules/user.js';
import * as profile from './modules/profile.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    profile,
  },
});
