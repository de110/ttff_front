<template>
  <div class="modal" :class="{ active: true }">
    <div class="overlay" @click="$emit('close')"></div>
    <div class="modal-card">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal,
.overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: relative;
  max-width: 88vw;
  margin: auto;
  margin-top: 8vh;
  padding-top: 2vh;
  /* padding: 20px; */
  background-color: white;
  border: 2px solid rgb(245, 109, 145);
  border-radius: 15px;
  /* 이부분을 수정해야 todo modal 문제 해결 */
  /* min-height: 80vh; */
  min-height: 60vh;
  z-index: 10;
  opacity: 1;
}
</style>
