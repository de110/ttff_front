<template>
  <div>
    <page-name>
      <h1 slot="title">회원가입</h1>
      <i slot="icon" class="fas fa-times out" @click="cancel"></i
      >회원가입</page-name
    >
    <signup-form></signup-form>
  </div>
</template>

<script>
import PageName from '@/components/common/PageName.vue';
import SignupForm from '@/components/SignupForm.vue';
export default {
  components: { PageName, SignupForm },
  methods: {
    cancel() {
      this.$router.replace('./login');
    },
  },
};
</script>

<style></style>
