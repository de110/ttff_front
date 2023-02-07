<template>
  <div class="attend-container">
    <h2><slot name="title"></slot></h2>
    <hr class="attend-hr" />
    <div class="button-container">
      <button class="attend">출석<slot name="attend"></slot></button>
      <button class="late">지각<slot name="late"></slot></button>
      <button class="absence">결석<slot name="absence"></slot></button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sunflower:wght@300&display=swap');
.attend-container {
  margin: 0 auto;
  margin-bottom: 7.5vh;
  width: 86vw;
}
h2 {
  margin-bottom: 0;
  color: rgb(245, 109, 145);
  font-family: 'Sunflower', sans-serif;
}
.button-container {
  margin-top: 2.2vh;
  width: 86vw;
  display: flex;
  justify-content: space-between;
}
.button-container button {
  width: 66px;
  height: 66px;
  border-radius: 33px;
  border: none;
  color: white;
}
.attend {
  background-color: rgb(107, 203, 119);
}
.absence {
  background-color: rgb(255, 107, 107);
}
.late {
  background-color: rgb(255, 217, 61);
}
.attend-hr {
  width: 86vw;
  height: 1px;
  border: none;
  background-color: rgb(245, 109, 145);
}
</style>
