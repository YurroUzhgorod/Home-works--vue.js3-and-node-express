import { v4 as uuidv4 } from "uuid";
import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  //розділ де описуємо глобальні змінні додатку
  state() {
    return {
      usersList: [],
    };
  },
  // функції, які здійснюють зчитування значень з стейта і які ми можемо використовувати у компонентах
  getters: {
    getList: (state) => state.usersList,
  },
  //Розділ, де описуємо функції, які мають право робити зміни у стейті
  mutations: {
    setNewUserInUserList(state, userData) {
      //Створюємо новий об"єкт-товар
      const user = {
        id: uuidv4(),
        ...userData,
      };
      state.usersList.push(user); //Додаємо новий об"єкт-товар у список
    },
    setUsersListWithoutDeletedUser(state, idToDelete) {
      state.usersList = state.usersList.filter(
        (item) => item.id !== idToDelete
      );
    },
    setNewUsersData(state, user) {
      const userIndex = state.usersList.findIndex(
        (item) => item.id === user.id
      );
      if (userIndex >= 0)
        state.usersList[userIndex] = {
          ...user,
        };
    },
  },

  // розділ, де описуємо функції, які викликаємо у компонентах, якшо хочемо змінити стейт
  actions: {
    addNewUser({ commit }, user) {
      commit("SetNewUserInUserList", user);
    },
    deleteUser({ commit }, IdToDelete) {
      commit("SetUsersListWithoutDeletedUser", IdToDelete);
    },
    updateUser({ commit }, user) {
      commit("SetNewUsersData", user);
    },
  },
});

export default store;
