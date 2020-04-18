<template>
  <div class="view-profile container" v-if="profile.uid">
    <div class="card">
      <h2 class="center">{{ profile.displayName }}'s wall</h2>
      <div class="messages">
        <message
          v-for="(message, index) in messages"
          :key="index"
          :message="message"
        />
      </div>
      <new-message :target-profile="profile"></new-message>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Message from '../components/profile/message';
import profileService from '../services/profileService';
import NewMessage from '../components/profile/NewMessage';
export default {
  name: 'profile',
  components: { NewMessage, Message },
  data() {
    return {
      profile: {},
    };
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  watch: {
    slug: {
      handler: function(newSlug) {
        profileService.getProfileByField('slug', newSlug).then(profile => {
          this.profile = profile;
          this.$store.dispatch('message/getMessages', profile.uid);
        });
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters('message', ['messages']),
  },
};
</script>

<style scoped></style>
