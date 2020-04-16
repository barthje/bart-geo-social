<template>
  <nav>
    <div class="nav-wrapper teal">
      <router-link class="brand-logo" :to="{ name: 'map' }">Home</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="loggedIn">
          <router-link :to="{ name: 'map' }">Map</router-link>
        </li>
        <li v-if="!loggedIn">
          <router-link :to="{ name: 'login' }">Login</router-link>
        </li>
        <li v-if="!loggedIn">
          <router-link :to="{ name: 'signup' }">Signup</router-link>
        </li>
        <li v-if="loggedIn">
          <router-link :to="{ name: 'logout' }">Logout</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'nav-bar',
  computed: {
    ...mapGetters('user', ['loggedIn']),
  },
};
</script>

<style scoped></style>
