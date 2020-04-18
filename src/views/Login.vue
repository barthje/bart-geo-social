<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel center">
      <h2 class="center">Login</h2>
      <div class="input-field">
        <input
          type="email"
          name="email"
          v-model="email"
          placeholder="E-mail"
          required
        />
      </div>
      <div class="input-field">
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Password"
          required
        />
      </div>
      <div class="field center">
        <button type="submit" class="btn indigo">Login</button>
      </div>
      <p v-if="errorMessage" class="red-text">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import userService from '../services/userService';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      this.errorMessage = '';
      try {
        await userService.login(this.email, this.password);
        this.$router.push({ name: 'map' });
      } catch (response) {
        this.errorMessage = response.message;
      }
    },
  },
};
</script>

<style scoped></style>
