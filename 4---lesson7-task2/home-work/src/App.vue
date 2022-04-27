<template>
  <price-summator />
</template>

<script>
import PriceSummator from "./components/PriceSummator";

export default {
  name: "App",
  components: {
    PriceSummator,
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
