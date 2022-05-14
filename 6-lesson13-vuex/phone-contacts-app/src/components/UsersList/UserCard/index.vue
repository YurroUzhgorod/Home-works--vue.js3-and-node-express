<template>
  <div>
    <div>
      <img :src="user.photoSrc" />
    </div>
    <div>
      {{ fullName }}
    </div>
    <div>
      <!-- <button @click="$emit('show-info', user.id)">Info</button> -->
      <button @click="$emit('show-info')">Info</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",

  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    fullName() {
      return `${this.user.name} ${this.user.secondName}`;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>