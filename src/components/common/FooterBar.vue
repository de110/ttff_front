<template>
  <div class="footer">
    <div class="icon-container" @click="home">
      <i class="fa-solid fa-house icon"></i>
      홈
    </div>
    <div class="icon-container" @click="chat">
      <i class="fa-solid fa-comments icon"></i>
      채팅
    </div>
    <div class="icon-container" @click="attend">
      <i class="fa-solid fa-circle-check icon"></i>
      출석
    </div>
    <div class="icon-container" @click="myInfo">
      <i class="fa-solid fa-user icon"></i>
      내 정보
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    home() {
      this.$router.push(`/study`);
    },
    attend() {
      this.$router.push(`/attend`);
    },
    chat() {
      this.$router.push(`/chat/room`);
    },
    myInfo() {
      this.$router.push(`/myInfo`);
    },
  },
};
</script>

<style scoped>
div {
  margin: 1.3vh auto;
}
.footer {
  margin: 0 auto;
  width: 100vw;
  height: 8vh;
  padding: 1vh 0;
  display: flex;
  justify-content: space-between;
  text-align: center;
  background-color: rgb(245, 109, 145);
  color: white;
  position: fixed;
  top: 90vh;
}
.icon-container {
  display: inline-block;
  font-size: 1.2rem;
}
.icon {
  font-size: 2.4rem;
  display: block;
}
</style>
