<template>
  <div>
    <router-link
      :to="{ name: 'profile', params: { slug: message.fromSlug } }"
      class="teal-text"
      data-testid="name"
      >{{ message.fromDisplayName }}</router-link
    >
    <span class="grey-text text-darken-3" data-testid="message">
      {{ message.content }}
    </span>
    <span class="grey-text time" data-testid="datetime">{{
      message.created | date
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'message',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
