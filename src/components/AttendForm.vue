<template>
  <div class="container">
    <div>
      <select id="name" @change="selectMyStudy" class="selectStudy">
        <option selected disabled>스터디 선택</option>
        <option v-for="name in studyNames" :key="name">
          {{ name.title }}
        </option>
      </select>
    </div>
    <div>
      <attend>
        <template v-slot:title>
          내 출석부
        </template>
        <template v-slot:attend> {{ myAttend }}회 </template>
        <template v-slot:late> {{ myLate }}회 </template>
        <template v-slot:absence> {{ myAbsence }}회 </template>
      </attend>
    </div>
    <div>
      <template v-if="this.studyUsers!=this.user">
        <select id="user" @change="getSelectedStudyAttend" class="member">
          <option selected disabled>팀원</option>
          <option v-for="name in studyUsers" :key="name">
            {{ name}}
          </option>
        </select>
        <attend>
          <template v-slot:title>
            스터디 출석부
          </template>
          <template v-slot:attend> {{ attend }}회 </template>
          <template v-slot:late> {{ late }}회 </template>
          <template v-slot:absence> {{ absence }}회 </template>
        </attend>
        <button class="attend-check" @click="check">출석 체크</button>
      </template>
    </div>
  </div>
</template>

<script>
import Attend from '../components/common/Attend.vue';
export default {
  components: { Attend },
  data() {
    return {
      user: '',
      myStudys: [],
      studyNames: [],
      studyUsers: [],
      selectOption: '',
      manager:'',
      // onlyName: [],
    };
  },
  computed: {
    attend() {
      return this.$store.state.Study.attendNum;
    },
    late() {
      return this.$store.state.Study.lateNum;
    },
    absence() {
      return this.$store.state.Study.absenceNum;
    },
    myAttend() {
      return this.$store.state.Study.myAttendNum;
    },
    myLate() {
      return this.$store.state.Study.myLateNum;
    },
    myAbsence() {
      return this.$store.state.Study.MyAbsenceNum;
    },
  },
  created() {
    this.setAttendHome();
  },
  methods: {
    initStudyUsers() {
      this.studyUsers = [];
    },
    selectMyStudy() {
      this.initStudyUsers();
      const selecName = document.getElementById('name');
      this.selectOption = selecName.options[selecName.selectedIndex].value;

      this.getSelectedStudyUsers();
      this.getSelectedStudyAttend();
      this.getMyAttend();
    },
    check() {
      this.$router.push('./attend/check');
    },
    async setAttendHome() {
      this.user = JSON.parse(localStorage.getItem('user')).userId;
      await this.$store.dispatch('setAttend', this.user);
      this.myStudys = this.$store.state.Study.myStudyList;
      console.log(this.myStudys)
      this.myStudys.filter(e => {
        if(this.user==e.member.memberId){
        return this.studyNames.push(e);}
      });
    },
    async getSelectedStudyAttend() {
      const id = document.getElementById('user');
      const select = id.options[id.selectedIndex].value;
      await this.$store.dispatch('teamAttend', {
        studyUser: select,
        studyName: this.selectOption,
      });
    },

    getMyAttend() {
      this.$store.dispatch('myAttend', this.selectOption);
    },

    getSelectedStudyUsers() {
      this.myStudys.filter(e => {
        if (e.title == this.selectOption ) {
            if (e.manager == false) 
            {
              this.studyUsers.push(e.member.memberId);
              console.log("man:",this.studyUsers)
              localStorage.setItem('study', e.title);
              localStorage.setItem('studyUser', JSON.stringify(this.studyUsers));
            }
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  margin-top: 5.5vh;
  width: 86vw;
}
.selectStudy {
  margin-bottom: 5.5vh;
  width: 86vw;
  height: 4.5vh;
  border: 1px solid rgb(245, 109, 145);
}
.attend-check {
  width: 86vw;
  height: 8vh;
  font-size: 2rem;
  background-color: white;
  border: 1px solid rgb(245, 109, 145);
  color: rgb(245, 109, 145);
  font-family: 'Gothic A1', sans-serif;
}
.member {
  position: absolute;
  left: 71vw;
  border: 1px solid rgb(245, 109, 145);
  height: 3vh;
  width: 20vw;
}
</style>
