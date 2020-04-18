<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel center">
      <h2 class="center">Signup</h2>
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
      <div class="input-field">
        <input
          type="text"
          name="displayName"
          v-model="displayName"
          placeholder="Display name"
          required
        />
      </div>
      <div class="field center">
        <button type="submit" class="btn indigo">Signup</button>
      </div>
      <p v-if="errorMessage" class="red-text">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import userService from '../services/userService';
import profileService from '../services/profileService';
import slugify from 'slugify';
import { mapGetters } from 'vuex';
export default {
  name: 'signup',
  data() {
    return {
      email: '',
      password: '',
      displayName: '',
      slug: '',
      errorMessage: '',
    };
  },
  computed: {
    ...mapGetters('user', ['loggedIn']),
  },
  methods: {
    async signup() {
      this.errorMessage = '';

      try {
        const profile = {
          displayName: this.displayName,
          slug: slugify(this.displayName, {
            lower: true,
          }),
        };

        const displayNameExists = await profileService.profileExistsWithField(
          'slug',
          profile.slug
        );

        if (displayNameExists) {
          this.errorMessage = `Display name ${profile.displayName} already exists, please choose another one.`;
          return;
        }

        const user = await userService.register(this.email, this.password);

        this.$store.dispatch('profile/insertProfile', {
          uid: user.uid,
          profileData: profile,
        });
        this.$store.dispatch('user/setUser', user);
        this.$router.push({ name: 'map' });
      } catch (response) {
        this.errorMessage = response.message;
      }
    },
  },
};
</script>

<style scoped></style>
