<template>
  <div class="loginForm-container">
    <form @submit.prevent="submitForm">
      <div>
        <input type="text" placeholder="아이디" v-model="userId" />
      </div>
      <div>
        <input type="password" placeholder="비밀번호" v-model="userPw" />
      </div>
      <button class="login-button">
        로그인
      </button>
    </form>
    <router-link to="/signup">회원가입</router-link>
  </div>
</template>

<script>
import { login } from '@/api/index.js';
export default {
  data() {
    return {
      userId: '',
      userPw: '',
    };
  },
  methods: {
    async submitForm() {
      await login(this.userId);
      this.$router.push(`/study`);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@400&display=swap');
div {
  text-align: center;
}
input {
  border-radius: 10px;
  border: 1px solid rgb(245, 109, 145);
  width: 86vw;
  height: 6vh;
  margin-bottom: 3.5vh;
  outline-color: rgb(245, 109, 145);
}
input::placeholder {
  color: rgb(223, 223, 222);
  font-family: 'Gothic A1', sans-serif;
}
.loginForm-container {
  margin-top: 15vh;
}
.login-button {
  border: 1px solid rgb(245, 109, 145);
  border-radius: 10px;
  width: 86vw;
  height: 9vh;
  font-size: 2.6rem;
  background-color: rgb(245, 109, 145);
  color: white;
  font-family: 'Gothic A1', sans-serif;
  margin-bottom: 4vh;
}
a {
  text-decoration: none;
  color: rgb(245, 109, 145);
  font-size: 1.6rem;
}
</style>
