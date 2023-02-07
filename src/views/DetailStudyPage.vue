<template>
  <div>
    <page-name>
      <h1 slot="title">게시물</h1>
      <i slot="icon" class="fa-solid fa-chevron-left" @click="back"></i>
    </page-name>
    <detail-study-form></detail-study-form>
  </div>
</template>

<script>
import PageName from '../components/common/PageName.vue';
import DetailStudyForm from '../components/DetailStudyForm.vue';
export default {
  components: { PageName, DetailStudyForm },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
