//Calendar.vue, TodoList.vue vuex
// import axios from 'axios';

const Calendar = {
  state: {
    attend: [],
    checkUser: [],
  },
  mutations: {
    initAttend(state) {
      state.attend = [];
    },

    addNewAttend(state, payload) {
      state.attend.push(payload);
    },
    clearAll(state) {
      state.attend = [];
    },
    studyUser(state, payload) {
      state.checkUser = payload;
    },
  },
  actions: {},
  getters: {},
};
export default Calendar;
