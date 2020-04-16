import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as VueGoogleMaps from 'vue2-google-maps';
import 'nprogress/nprogress.css';

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC_oR9FuJZ5eOVSsB2mg4SbEbbqmIT2xlc',
    libraries: 'places',
  },
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
