<template>
  <div>
    <div class="name-container">
      <slot name="icon"></slot>
      <slot name="name"></slot>
    </div>
    <hr class="infoLine-hr" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sunflower:wght@300&display=swap');
.name-container {
  margin: 1vh auto;
  width: 86vw;
  display: flex;
  justify-content: space-between;
  color: rgb(245, 109, 145);
  font-family: 'Sunflower', sans-serif;
}
h2 {
  margin: 0;
  font-size: 1.6em;
  display: inline-block;
}
h3 {
  width: 80vw;
  margin: 0 auto;
  font-size: 1.3em;
}
i {
  font-size: 1.3em;
}
.infoLine-hr {
  width: 86vw;
  height: 1px;
  border: none;
  background-color: rgb(245, 109, 145);
}
</style>
