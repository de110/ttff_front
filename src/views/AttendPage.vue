<template>
  <div>
    <page-name>
      <h1 slot="title">출석관리</h1>
    </page-name>
    <attend-form></attend-form>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import AttendForm from '../components/AttendForm.vue';
import FooterBar from '../components/common/FooterBar.vue';
import PageName from '../components/common/PageName.vue';
export default {
  components: { PageName, AttendForm, FooterBar },
};
</script>

<style></style>
