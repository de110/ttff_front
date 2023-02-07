<template>
  <div>
    <h2>{{ this.study.title }}</h2>
    <hr class="detail-study-hr" />
    <h3 class="term">기간 : {{ this.study.start }} ~ {{ this.study.end }}</h3>
    <hr class="detail-study-hr" />
    <h4>{{ this.study.si }} {{ this.study.dong }}</h4>
    <h3>{{ this.study.rule }}</h3>
    <h5 class="go-chat">
      {{ this.study.member }}
      <i
        class="fa-solid fa-comment chat"
        @click="chat(study.title, study.member)"
      ></i>
    </h5>
    <hr class="detail-study-hr end" />
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      study: '',
      user: '',
    };
  },
  created() {
    this.setDetailStudy();
  },
  methods: {
    async setDetailStudy() {
      this.user = JSON.parse(localStorage.getItem('user')).userId;
      const info = {
        type: this.$route.params.type,
        id: this.$route.params.id,
      };
      await this.$store.dispatch('setStudy', info);
      this.study = this.$store.state.Study.studyInfo;
            console.log(this.study)
    },

    chat(title, manager) {
      let params = new URLSearchParams();
      params.append('roomName', title);
      params.append('host', manager);
      params.append('guest', this.user);
      axios.post('/api/chat/room', params).then(res => {
        localStorage.setItem('wschat.sender', this.user);
        localStorage.setItem('wschat.roomId', res.data.roomId);
        location.href = '/chat/room/enter/' + res.data.roomId;
      });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');
h2 {
  font-size: 2rem;
  text-align: center;
  font-family: 'Gothic A1', sans-serif;
}
h3 {
  margin: 0 auto;
  font-size: 1.5rem;
  /* text-align: center; */
  width: 86vw;
  font-family: 'Gothic A1', sans-serif;
}
h4 {
  margin: 2vh auto;
  font-size: 1.4rem;
  font-family: 'Gothic A1', sans-serif;
  color: rgb(141, 141, 170);
  width: 86vw;
  text-align: end;
}
.date {
  display: inline-block;
  width: 43vw;
}
span {
  color: rgb(223, 223, 222);
}
.date-container {
  margin: 0 auto;
  width: 86vw;
}
.term {
  height: 7vh;
  line-height: 7vh;
}
.end {
  position: absolute;
  top: 90vh;
  left: 7vw;
}
.go-chat {
  top: 78vh;
  width: 86vw;
  position: absolute;
  text-align: end;
  font-size: 1.8em;
  color: rgb(245, 109, 145);
}
.chat {
  font-size: 3.5rem;
}
.detail-study-hr {
  width: 86vw;
  height: 1px;
  border: none;
  background-color: rgb(223, 223, 222);
}
</style>
