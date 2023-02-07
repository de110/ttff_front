<template>
  <div>
    <page-name>
      <h1 slot="title">게시물 작성</h1>
      <i slot="icon" class="fas fa-times back" @click="back"></i>
    </page-name>
    <add-study-form></add-study-form>
  </div>
</template>

<script>
import AddStudyForm from '../components/AddStudyForm.vue';
import PageName from '../components/common/PageName.vue';
export default {
  components: { PageName, AddStudyForm },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style></style>
