import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Map from '../views/MapPage';
import Profile from '../views/Profile';
import Login from '../views/Login';
import Signup from '../views/Signup';
import * as firebase from 'firebase/app';
import nprogress from 'nprogress';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'map',
    component: Map,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/logout',
    name: 'logout',
    component: Map,
    meta: {
      requiresAuth: true,
    },
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('user/logout').then(() => {
        next({ name: 'map' });
      });
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/profile/:slug',
    name: 'profile',
    component: Profile,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  nprogress.start();
  firebase.auth().onAuthStateChanged(user => {
    const loggedIn = !!user;
    if (loggedIn) {
      store
        .dispatch('user/setUser', user)
        .then(user => store.dispatch('profile/fetchProfile', user.uid));
    }

    if (routeTo.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
      next({ name: 'login' });
      nprogress.done();
      return;
    }

    if (routeTo.matched.some(record => !record.meta.requiresAuth) && loggedIn) {
      next({ name: 'map' });
      nprogress.done();
      return;
    }

    nprogress.done();
    next();
  });
});

export default router;
