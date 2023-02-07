<template>
  <div>
    <page-name>
      <h1 slot="title">채팅</h1>
    </page-name>
    <chat-home-form></chat-home-form>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import ChatHomeForm from '../components/ChatHomeForm.vue';
import FooterBar from '../components/common/FooterBar.vue';
import PageName from '../components/common/PageName.vue';
export default {
  components: {
    ChatHomeForm,
    PageName,
    FooterBar,
  },
};
</script>

<style>
div {
  margin: 2.3vh auto;
}
</style>
