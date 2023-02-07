<template>
  <div>
    <page-name>
      <h1 slot="title">출석 체크</h1>
      <i slot="icon" class="fas fa-times back" @click="back"></i>
    </page-name>
    <calendar-form></calendar-form>
  </div>
</template>

<script>
import CalendarForm from '../components/CalendarForm.vue';
import PageName from '../components/common/PageName.vue';
export default {
  components: { PageName, CalendarForm },
  methods: {
    back() {
      this.$router.go(-1);
      localStorage.removeItem('studyUser');
      localStorage.removeItem('study');
    },
  },
};
</script>

<style></style>
