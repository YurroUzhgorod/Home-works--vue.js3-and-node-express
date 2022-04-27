<template>
  <div>
    <table>
      <tr>
        <td colspan="2">
          <game-header :number-array="numbersList" />
        </td>
      </tr>
      <tr>
        <td>
          <player-one
            @checkNumFromUser1="checkNumFromUser1"
            :checked-history="checkedHistory"
            :guessed-numbers-array="guessedNumbersOfPlayer1"
          />
        </td>
        <td>
          <player-two
            @checkNumFromUser2="checkNumFromUser2"
            :checked-history="checkedHistory"
            :guessed-numbers-array="guessedNumbersOfPlayer2"
          />
        </td>
      </tr>
      <tr v-if="this.finishText" class="finish-text">
        <td colspan="2">{{ this.finishText }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import GameHeader from "./components/GameHeader";
import PlayerOne from "./components/PlayerOne";
import PlayerTwo from "./components/PlayerTwo";

export default {
  name: "App",
  components: {
    GameHeader,
    PlayerOne,
    PlayerTwo,
  },

  data() {
    return {
      numbersList: [
        {
          number: Math.floor(Math.random() * 9 - 1 + 1),
          isNumVisible: false,
        },
        {
          number: Math.floor(Math.random() * 9 - 1 + 1),
          isNumVisible: false,
        },
        {
          number: Math.floor(Math.random() * 9 - 1 + 1),
          isNumVisible: false,
        },
      ],
      checkedHistory: [],
      guessedNumbersOfPlayer1: [],
      guessedNumbersOfPlayer2: [],
      hiddenNumbers: 3,
      finishText: null,
    };
  },

  methods: {
    checkNumFromUser1(UserAnswer) {
      for (let i = 0; i < this.numbersList.length; i++) {
        if (this.numbersList[i].number === UserAnswer) {
          this.guessedNumbersOfPlayer1.push(UserAnswer);
          this.hiddenNumbers--;
          this.numbersList[i].isNumVisible = true;
        }
        if (this.hiddenNumbers === 0) this.finishText = " Виграв 2-й гравець";
      }

      this.checkedHistory.push(UserAnswer);
    },
    checkNumFromUser2(UserAnswer) {
      for (let i = 0; i < this.numbersList.length; i++) {
        if (this.numbersList[i].number === UserAnswer) {
          this.guessedNumbersOfPlayer2.push(UserAnswer);
          this.hiddenNumbers--;
          this.numbersList[i].isNumVisible = true;
        }
      }
      if (this.hiddenNumbers === 0) this.finishText = " Виграв 1-й гравець";
      this.checkedHistory.push(UserAnswer);
    },
  },
};
</script>

<style>
table {
  width: 401px;
  margin: auto;
}
.finish-text {
  text-align: center;
}
</style>
