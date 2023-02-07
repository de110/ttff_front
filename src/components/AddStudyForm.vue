<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="title-container">
        <input type="text" placeholder="제목" v-model="title" class="title" />
      </div>

      <div class="main-container">
        <h2 class="input-title">카테고리 선택</h2>
        <div class="select" @change="selectType">
          <input type="radio" id="select1" name="type" value="language" />
          <label for="select1">언어</label>
          <input type="radio" id="select2" name="type" value="project" />
          <label for="select2">프로젝트</label>
          <input type="radio" id="select3" name="type" value="certificate" />
          <label for="select3">자격증</label>
          <input type="radio" id="select4" name="type" value="job" />
          <label for="select4">취업</label>
        </div>
        <hr class="add-study-hr" />
      </div>

      <div class="main-container">
        <h2 class="input-title">스터디 기간</h2>
        <section>
          <!-- eslint-disable-next-line prettier/prettier -->
        <date-picker v-model="start" :lang="lang" placeholder="시작일" valueType="format"></date-picker>
          <!-- eslint-disable-next-line prettier/prettier -->
        <date-picker v-model="end" :lang="lang" placeholder="종료일" valueType="format"></date-picker>
        </section>
        <hr class="add-study-hr" />
      </div>

      <div class="textarea-container">
        <h2 class="text-container input-title">스터디 소개</h2>
        <select id="period" @change="period" class="period">
          <option selected="disabled">모집마감일</option>
          <option value="7">7일 후</option>
          <option value="10">10일 후</option>
          <option value="15">15일 후</option>
          <option value="30">30일 후</option>
        </select>
        <textarea v-model="studyRule"> </textarea>
      </div>
      <i class="fa-solid fa-circle-check submit" @click="submitForm"></i>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { addStudy, addMembersForm } from '@/api/index.js';
export default {
  components: { DatePicker },
  data() {
    return {
      title: '',
      type: '',
      start: null,
      end: null,
      studyRule: '',
      studyPeriod: '',
      si: '',
      gungu: '',

      lang: {
        days: ['일', '월', '화', '수', '목', '금', '토'],
        months: [
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '11월',
          '12월',
        ],
        yearFormat: 'YYYY년',
        monthFormat: 'MM월',
        monthBeforeYear: false,
      },
    };
  },
  methods: {
    selectType() {
      const typeLength = document.getElementsByName('type').length;
      for (var i = 0; i < typeLength; i++) {
        if (document.getElementsByName('type')[i].checked == true) {
          this.type = document.getElementsByName('type')[i].value;
          console.log(document.getElementsByName('type')[i].value);
        }
      }
    },
    period() {
      const select = document.getElementById('period');
      this.studyPeriod = select.options[select.selectedIndex].value;
    },
    submitForm() {
      const area = JSON.parse(localStorage.getItem('area'));
      const newStudy = {
        title: this.title,
        type: this.type,
        start: this.start,
        end: this.end,
        rule: this.studyRule,
        period: this.studyPeriod,
        // si: area.si,
        // gungu: area.gungu,
        dongNm: area.dongNm,
        member: JSON.parse(localStorage.getItem('user')).userId,
      };

      const membersInfo = {
        title: this.title,
        member: {memberId:JSON.parse(localStorage.getItem('user')).userId},
        manager: true,
      };
      console.log(membersInfo.manager)
      addMembersForm(membersInfo);
      addStudy(newStudy);
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&display=swap');
.input-title {
  margin: 2vh auto;
  width: 86vw;
  font-family: 'Gothic A1', sans-serif;
  color: rgb(141, 141, 170);
  font-size: 1.6rem;
}
.title-container {
  text-align: center;
}
.title {
  border: 1px solid rgb(233, 233, 222);
  border-top: 0;
  border-left: 0;
  border-right: 0;
  height: 5.8vh;
  width: 86vw;
  outline-color: rgb(245, 109, 145);
}
.title::placeholder {
  color: rgb(223, 223, 222);
  font-family: 'Gothic A1', sans-serif;
}
.select {
  margin: 1vh auto;
  margin-bottom: 2vh;
  width: 86vw;
  display: flex;
  justify-content: space-between;
}
/* 실제 체크박스를 화면에서 숨김*/
.select input[type='radio'] {
  display: none;
}
/* 가짜 체크박스 */
.select input[type='radio'] + label {
  display: inline-block;
  cursor: pointer;
  height: 5vh;
  width: 19vw;
  border: 2px solid rgb(245, 109, 145);
  border-radius: 15px;
  line-height: 5vh; /* 세로 정렬을 위해 높이값과 일치*/
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
}
.select input[type='radio'] + label {
  background-color: white;
  color: rgb(245, 109, 145);
}
/* 체크박스를 체크 했을 때 */
.select input[type='radio']:checked + label {
  background-color: rgb(245, 109, 145);
  color: white;
}
section {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  width: 86vw;
  height: 7vh;
}
.mx-calendar {
  border: 3px solid rgb(245, 109, 145);
}
.mx-datepicker {
  margin: 0;
  width: 41vw;
  height: 9vh;
}
.mx-icon-calendar {
  color: rgb(245, 109, 145);
}
.textarea-container {
  margin: 0 auto;
  width: 86vw;
}
.text-container {
  width: 57vw;
  display: inline-block;
  margin-bottom: 1vh;
}
textarea {
  margin: 0 auto;
  width: 86vw;
  height: 35vh;
  border: none;
  outline-color: rgb(245, 109, 145);
}
textarea::placeholder {
  width: 86vw;
  font-family: 'Gothic A1', sans-serif;
  color: rgb(141, 141, 170);
  font-size: 1.6rem;
  font-weight: bold;
}
.period {
  margin-top: 1vh;
  position: absolute;
  border: 1px solid rgb(233, 233, 222);
  border-radius: 10px;
  width: 30vw;
  height: 4vh;
}
.submit {
  font-size: 3.2rem;
  position: relative;
  left: 85vw;
  color: rgb(245, 109, 145);
}
.add-study-hr {
  width: 88vw;
  height: 1px;
  border: none;
  background-color: rgb(233, 233, 222);
}
</style>
