<template>
  <div>
    <div>
      <study-type-bar></study-type-bar>
      <hr class="studyList-hr" />
    </div>
    <div>
      <ul v-for="list in getStudyLists" :key="list.title">
        <li>
          <router-link :to="`study/${list.type}/${list.id}`">
            <div class="list">{{ list.title }}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import StudyTypeBar from './StudyTypeBar.vue';
export default {
  components: { StudyTypeBar },
  computed: {
    getStudyLists() {
      return this.$store.state.Study.homeList;
    },
  },
};
</script>

<style scoped>
div {
  margin: 0 auto;
}
ul {
  padding: 0;
  margin: 0 auto;
  list-style-type: none;
}
li {
  margin: 0 auto;
  border: 1px solid rgb(223, 223, 222);
  width: 86vw;
  height: 14vh;
  border-top: 0;
  border-left: 0;
  border-right: 0;
}
a {
  text-decoration: none;
}
.list {
  margin: 0;
  line-height: 14vh;
  font-size: 2rem;
  color: rgb(63, 51, 81);
}
.studyList-hr {
  width: 86vw;
  height: 1px;
  border: none;
  background-color: rgb(223, 223, 222);
  margin: 0 auto;
  margin-top: 1vh;
}
</style>
