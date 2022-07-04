<template>
  <div>
    <div v-if="isLoading">Loading......</div>
    <div v-if="isError">Error!!!!</div>

    <div v-show="!isLoading && !isError">
      <div class="header">
        <slot name="header"> </slot>
      </div>
      <slot> </slot>
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MainMasterpage",

  computed: {
    ...mapGetters("books", ["isLoading", "isError"]),
  },
};
</script>

<style lang="scss">
.header {
  > * {
    margin: 20px;
  }
}
</style>
