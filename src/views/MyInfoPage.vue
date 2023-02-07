<template>
  <div>
    <page-name>
      <h1 slot="title">내 정보</h1>
    </page-name>
    <my-info-form></my-info-form>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import FooterBar from '../components/common/FooterBar.vue';
import PageName from '../components/common/PageName.vue';
import MyInfoForm from '../components/MyInfoForm.vue';
export default {
  components: { PageName, MyInfoForm, FooterBar },
};
</script>

<style></style>
