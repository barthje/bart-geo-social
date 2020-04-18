import Vue from 'vue';
import Vuex from 'vuex';
import * as user from './modules/user.js';
import * as profile from './modules/profile.js';
import * as message from './modules/message.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    profile,
    message,
  },
});
