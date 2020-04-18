<template>
  <div class="card">
    <div class="card-content center-align">
      <form @submit.prevent="sendMessage">
        <label for="message">Message</label>
        <input
          type="text"
          name="message"
          v-model="message"
          data-testid="message-input"
          required
        />
        <button class="waves-effect waves-light btn" type="submit">
          Send message
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import messageService from '../../services/messageService';
import { mapGetters } from 'vuex';
export default {
  name: 'new-message',
  props: {
    targetProfile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      message: '',
    };
  },
  computed: {
    ...mapGetters('profile', ['profile']),
  },
  methods: {
    sendMessage() {
      const message = {
        content: this.message,
        created: new Date(),
        fromUid: this.profile.uid,
        fromDisplayName: this.profile.displayName,
        fromSlug: this.profile.slug,
        uid: this.targetProfile.uid,
      };

      messageService.post(message);

      this.message = '';
    },
  },
};
</script>

<style scoped></style>
