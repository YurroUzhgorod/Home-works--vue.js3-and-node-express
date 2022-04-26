<template>
  <div>
    <div v-for="(message, index) in messagesList" :key="index">
      {{ message.text }}
      <button @click="$emit('addLikes', message)">like</button
      ><button @click="$emit('addDisLikes', message)">dislike</button>Likes:{{
        message.likes
      }}
      -- Dislikes:{{ message.dislikes }}
    </div>
    <label>
      <input
        type="text"
        placeholder="type a new message"
        v-model="currentMessage"
      />
    </label>
    <button @click="$emit('addMessage', this.currentMessage)">send</button>
  </div>
</template>

<script>
export default {
  name: "MesengerComponent",

  props: {
    messagesList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentMessage: null,
    };
  },
};
</script>

<style lang="scss" scoped></style>
