import { createStore } from "vuex";
import books from "./books";
import authors from "./authors";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    books,
    authors,
  },
});
