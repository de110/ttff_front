<template>
  <div>
    <page-name>
      <h1 slot="title">삼삼오오</h1>
      <i
        slot="icon"
        class="fa-solid fa-arrow-right-from-bracket"
        @click="out"
      ></i>
    </page-name>
    <div class="studyList-container">
      <study-list></study-list>
      <i class="fa-solid fa-circle-plus plus" @click="addStudy"></i>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import FooterBar from '../components/common/FooterBar.vue';
import PageName from '../components/common/PageName.vue';
import StudyList from '../components/StudyList.vue';
export default {
  components: { PageName, StudyList, FooterBar },
  methods: {
    out() {
      localStorage.clear();
      this.$router.push('/login');
    },
    addStudy() {
      this.$router.push(`/study/add`);
    },
  },
};
</script>

<style>
/* div {
  margin: 2.3vh auto;
} */
.studyList-container {
  position: relative;
  height: 76vh;
  overflow: auto;
}
.plus {
  position: relative;
  left: 80vw;
  top: 1vh;
  /* top: 77vh;
  left: 80vw; */
  font-size: 4.5rem;
  color: rgb(245, 109, 145);
}
</style>
