<template>
  <mesenger-component
    :messages-list="messagesData"
    @addMessage="addMessage"
    @addLikes="addLikes"
    @addDisLikes="addDisLikes"
  />
</template>

<script>
import MesengerComponent from "./components/MesengerComponent";

export default {
  name: "App",
  components: {
    MesengerComponent,
  },
  data() {
    return {
      messagesData: [],
    };
  },
  methods: {
    addMessage(newtext) {
      this.messagesData.push({
        text: newtext,
        likes: 0,
        dislikes: 0,
      });
    },
    addLikes(searchMessage) {
      searchMessage.likes += 1;
    },
    addDisLikes(searchMessage) {
      searchMessage.dislikes += 1;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
