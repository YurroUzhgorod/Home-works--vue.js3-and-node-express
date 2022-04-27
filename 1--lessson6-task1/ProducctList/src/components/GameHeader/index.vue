<template>
  <div class="container">
    <span>Число</span>
    <span v-if="numberArray[0].isNumVisible">{{ numberArray[0].number }}</span>
    <span v-else>__</span>
    <span v-if="numberArray[1].isNumVisible">
      {{ numberArray[1].number }}
    </span>
    <span v-else>__</span>
    <span v-if="numberArray[2].isNumVisible">{{ numberArray[2].number }}</span>
    <span v-else>__</span>
  </div>
</template>

<script>
export default {
  name: "GameHeader",

  props: {
    numberArray: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="css" scoped>
span {
  margin: 3px;
  padding: 5px;
  border: 2px black solid;
}
</style>
