<template>
  <div class="container">
    <h3>Гравець 2</h3>
    <label>
      Цифра
      <input
        type="number"
        v-model="currentUser2Answer"
        @change="UseOnlyNotUsedNum"
    /></label>
    <br />
    <button
      @click="$emit('checkNumFromUser2', currentUser2Answer)"
      :disabled="UseOnlyNotUsedNum"
    >
      Зробити хід
    </button>
    <div>
      <h4>вгадані цифри гравця:</h4>
      <div>
        <ul>
          <li v-for="(num, index) in guessedNumbersArray" :key="index">
            {{ num }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerOne",

  props: {
    checkedHistory: {
      type: Array,
      default: () => [],
    },
    guessedNumbersArray: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentUser2Answer: null,
      deActiveBtn: true,
      activeBtn: false,
    };
  },
  computed: {
    UseOnlyNotUsedNum() {
      if (this.checkedHistory.includes(this.currentUser2Answer))
        return this.deActiveBtn;
      return this.activeBtn;
    },
  },
};
</script>

<style lang="css" scoped></style>
