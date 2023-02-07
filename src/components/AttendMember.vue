<template>
  <div>
    <div>
      <h1 class="title">{{ studyName }}</h1>
      <hr class="attend-member-hr" />
      <p class="today">
        {{ this.$store.state.Study.year }}.{{
          this.$store.state.Study.month
        }}.{{ this.$store.state.Study.day }}
      </p>
    </div>
    <div>
      <!-- <template
        v-if="
          attend == 0 &&
            this.year == this.$store.state.Study.year &&
            this.month == this.$store.state.Study.month &&
            this.day == this.$store.state.Study.day
        "
      > -->
        <div v-for="(index, item) in users" :key="item" class="user">
          <h2>
            <div class="name-container">
              {{ index }}
              <!-- <hr class="name-hr" /> -->
            </div>
            <div class="select" @change="attendCheck(index, item)">
              <input type="radio" id="select1" :name="index" value="출석" />
              <label for="select1">출석</label>
              <input type="radio" id="select2" :name="index" value="지각" />
              <label for="select2">지각</label>
              <input type="radio" id="select3" :name="index" value="결석" />
              <label for="select3">결석</label>
            </div>
          </h2>
        </div>
        <div class="button-container">
          <button @click="check">완료</button>
        </div>
      <!-- </template>

      <template v-else-if="attend != 0">
        <ul class="member-attend">
          <li v-for="(item, index) in attend" :key="index">
            <i class="fa-regular fa-square-check"></i>&nbsp;&nbsp;
            {{ item.name }} -
            {{ item.attend }}
          </li>
        </ul>
      </template>
      <template v-else>
        <h2 class="none">출석이 없습니다.</h2>
      </template> -->
    </div>
  </div>
</template>

<script>
import { studyAttend } from '@/api/index.js';
export default {
  data() {
    return {
      studyName: '',
      users: [],
      year: '',
      month: '',
      day: '',
      checkmember: '',
      checkattend: '',
      attendInfo: [],
    };
  },
  async created() {
    await this.setAttendMember();
  },
  computed: {
    attend() {
      if (this.$store.getters.showAttend == []) {
        return 0;
      } else {
        return this.$store.getters.showAttend;
      }
    },
  },
  methods: {
    async setAttendMember() {
      const today = new Date();
      this.year = today.getFullYear();
      this.month = ('0' + (today.getMonth() + 1)).slice(-2);
      this.day = ('0' + today.getDate()).slice(-2);
      this.studyName = localStorage.getItem('study');

      const getUsers = JSON.parse(localStorage.getItem('studyUser'));
      this.users=getUsers;
      // .filter(e => {
      //   this.users.push(e.name);
      // });
      await this.$store.dispatch('getAttend', this.studyName);
    },
    attendCheck(index, item) {
      this.checkmember = index;
      const sl = document.getElementsByName(index).length;

      for (var i = 0; i < sl; i++) {
        if (document.getElementsByName(index)[i].checked == true) {
          this.checkattend = document.getElementsByName(index)[i].value;
          console.log(document.getElementsByName(index)[i].value);
        }
      }
      localStorage.setItem(
        item,
        JSON.stringify({
          name: index,
          attend: this.checkattend,
        }),
      );
    },
    check() {
      for (var i = 0; i < this.users.length; i++) {
        const attendInfo = {
          name: JSON.parse(localStorage.getItem(i)).name,
          attend: JSON.parse(localStorage.getItem(i)).attend,
          createdAt:
            this.$store.state.Study.year +
            '-' +
            this.$store.state.Study.month +
            '-' +
            this.$store.state.Study.day,
          studyName: this.studyName,
        };
        studyAttend(attendInfo);
        localStorage.removeItem(i);
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sunflower:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');
.title {
  text-align: center;
  font-family: 'Sunflower', sans-serif;
  color: rgb(245, 109, 145);
}
.today {
  font-family: 'Gothic A1', sans-serif;
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
}
.user {
  font-family: 'Gothic A1', sans-serif;
  /* margin: 2vh auto; */
  width: 88vw;
  text-align: center;
}
.button-container {
  text-align: center;
}

input[type='radio'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  margin-left: 4vw;
  border: 1px solid rgb(245, 109, 145);
  width: 14px;
  height: 14px;
  border-radius: 100%;
}
input[type='radio']:checked {
  background-color: rgb(245, 109, 145);
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  width: 14px;
  height: 14px;
  border-radius: 100%;
}
button {
  font-family: 'Gothic A1', sans-serif;
  width: 60vw;
  height: 5vh;
  font-size: 1.5em;
  font-weight: 600;
  border: 2px solid rgb(245, 109, 145);
  background-color: white;
  border-radius: 10px;
  color: rgb(245, 109, 145);
}
button:focus {
  background-color: rgb(245, 109, 145);
  color: white;
}
.member-attend {
  font-family: 'Sunflower', sans-serif;
  list-style: none;
  font-size: 2em;
}
i {
  color: rgb(245, 109, 145);
}
li {
  margin: 3vh auto;
}
.none {
  position: relative;
  top: 12vh;
  text-align: center;
  font-family: 'Sunflower', sans-serif;
  font-size: 2.5em;
}
.name-container {
  margin: 0 auto;
  margin-bottom: 1vh;
  font-size: 1.4em;
  font-family: 'Sunflower', sans-serif;
  border: 1px solid rgb(245, 109, 145);
  width: 60vw;
  border-top: none;
  border-right: none;
  border-left: none;
}
.attend-member-hr {
  width: 80vw;
  height: 2px;
  border: none;
  background-color: rgb(245, 109, 145);
}
/* .name-container {
}
.name-hr {
  border: none;
  margin-top: 0;
  width: 50vw;
  height: 1px;
  background-color: rgb(245, 109, 145);
} */
</style>
