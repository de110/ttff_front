<template>
  <div class="login-container">
    <div class="login-header">
      <page-name>
        <h1 slot="title">삼삼오오</h1>
      </page-name>
    </div>
    <div>
      <login-form></login-form>
    </div>
  </div>
</template>

<script>
import PageName from '@/components/common/PageName.vue';
import LoginForm from '@/components/LoginForm.vue';
export default {
  components: { PageName, LoginForm },
};
</script>

<style>
.login-header {
  margin: 0 auto;
  padding-top: 20vh;
}
</style>
