<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="" class="label">이름</label>
        <input type="text" v-model="userName" />
      </div>
      <div>
        <label for="" class="label">아이디(닉네임)</label>
        <input class="id" type="text" v-model="userId" />
        <button class="idCheck" @click.prevent="idCheck">중복확인</button>
      </div>
      <div>
        <label for="" class="label">비밀번호</label>
        <input type="password" v-model="userPw" />
      </div>
      <div>
        <label for="" class="label">비밀번호 확인</label>
        <input type="password" v-model="checkPw" />
      </div>
      <div>
        <label for="" class="label">지역 선택</label>
        <select-area></select-area>
      </div>
      <button class="submit" type="submit">가입하기</button>
    </form>
  </div>
</template>

<script>
// import koreaRegion from '@/assets/koreaRegion.json';
import { signUp } from '@/api/index.js';
import SelectArea from './common/SelectArea.vue';
export default {
  components: { SelectArea },
  data() {
    return {
      userName: '',
      userId: '',
      userPw: '',
      checkPw: '',
    };
  },
  methods: {
    submitForm() {
      const newUser = {
        // name: this.userName,
        // userId: this.userId,
        // pw: this.userPw,
        region: this.$store.state.Study.area,
        // dongList: [],
        memberId:this.userName,
        password:this.userPw
      };
      signUp(newUser);
      this.$router.push('./login');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@400&display=swap');
div {
  margin: 0 auto;
  font-family: 'Gothic A1', sans-serif;
}
.label {
  display: block;
}
form {
  width: 88vw;
  margin: 5vh auto;
}
input {
  border: 1px solid rgb(233, 233, 222);
  border-radius: 10px;
  height: 5.8vh;
  margin-bottom: 3vh;
  margin-top: 1.4vh;
  width: 86vw;
  outline-color: rgb(245, 109, 145);
}
label {
  font-size: 1.4rem;
  color: rgb(63, 51, 81);
  font-family: 'Gothic A1', sans-serif;
}
.id {
  width: 61vw;
  margin-right: 1vw;
}
.idCheck {
  border-radius: 10px;
  border: 1px solid rgb(245, 109, 145);
  height: 5.8vh;
  width: 24vw;
  line-height: 5.8vh;
  background-color: white;
  color: rgb(245, 109, 145);
  font-family: 'Gothic A1', sans-serif;
  font-size: 1.4rem;
}
/* select-area select {
  margin-top: 1.4vh;
  border: 1px solid rgb(233, 233, 222);
  border-radius: 10px;
  width: 25vw;
  height: 5.8vh;
}
select-area.select {
  display: flex;
  justify-content: space-between;
} */
.submit {
  margin-top: 4vh;
  width: 86vw;
  height: 9vh;
  font-size: 2.4rem;
  border-radius: 10px;
  background-color: rgb(245, 109, 145);
  border: none;
  color: white;
  font-family: 'Gothic A1', sans-serif;
}
</style>
<style>
select {
  margin-top: 1.4vh;
  border: 1px solid rgb(233, 233, 222);
  border-radius: 10px;
  width: 25vw;
  height: 5.8vh;
}
.select {
  display: flex;
  justify-content: space-between;
}
</style>
