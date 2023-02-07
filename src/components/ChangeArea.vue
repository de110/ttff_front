<template>
  <div class="container">
    <info-line>
      <i slot="icon" class="fa-solid fa-location-crosshairs"></i>
      <h3 slot="name">동네 재설정</h3>
    </info-line>
    <select-area></select-area>
    <info-line>
      <i slot="icon" class="fa-solid fa-location-crosshairs"></i>
      <h3 slot="name">동네 추가</h3>
    </info-line>
    <div class="dong-container">
      <div class="dong" v-for="(index, item) in dongs" :key="item">
        <input type="checkbox" v-model="getDong" :value="index" :id="item" />
        <label :for="item"> {{ index.dongNm }}</label>
      </div>
      <i class="fa-solid fa-circle-plus submit" @click="submit"></i>
    </div>
  </div>
</template>

<script>
import koreaRegion from '@/assets/koreaRegion.json';
import {  renewArea } from '@/api/index.js';
import InfoLine from './common/InfoLine.vue';
import SelectArea from './common/SelectArea.vue';
export default {
  components: { InfoLine, SelectArea },
  data() {
    return {
      koreaRegion,
      getDong: [],
      addDong: [],
    };
  },
  computed: {
    dongs() {
      // this.$store.commit('addDong', this.getDong); // 
      return this.$store.state.Study.allDongList; // 전체 동 선택지 반환

    },
  },
  watch: {
    dongs() {
      // this.addDong = this.$store.state.Study.setDong;
      // this.getDong = this.$store.state.Study.setDong;
    },
  },
  created() {
    this.$store.commit('initArea');
    // const gungu = JSON.parse(localStorage.getItem('area')).gungu;
    // this.getDong = koreaRegion[gungu];

  },

  methods: {
    initInput() {
      this.$router.go();
    },
    async submit() {
      this.changeArea();
      // const areaInfo = {
      //   name: JSON.parse(localStorage.getItem('user')).id,
        // dongList: this.getDong,
      // };
      // await this.$store.commit('addDong',this.getDong);
      // this.initInput();
    },
    changeArea() {
      this.$store.commit('addDong',this.getDong); // 추가한 동네를 addDong 내부의 setDong에 저장
      const changeInfo = {
        userId: JSON.parse(localStorage.getItem('user')).id,
        regions:  JSON.parse(localStorage.getItem('area'))
      };
      renewArea(changeInfo); // 유저가 재설정한 지역 정보 업데이트
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sunflower:wght@300&display=swap');
.container {
  margin-top: 2vh;
}
.check {
  float: right;
  font-size: 1.2em;
}
h2 {
  font-family: 'Sunflower', sans-serif;
  font-size: 2em;
  color: rgb(245, 109, 145);
  text-align: center;
}
h3 {
  width: 80vw;
  margin: 0 auto;
  font-family: 'Sunflower', sans-serif;
  font-size: 1.3em;
  color: rgb(245, 109, 145);
}

.dong-container {
  width: 80vw;
  margin: 0 auto;
}
.dong {
  display: inline-block;
  margin: 0 auto;
}
/* 실제 체크박스를 화면에서 숨김*/
.dong input[type='checkbox'] {
  display: none;
}
/* 가짜 체크박스 */
.dong input[type='checkbox'] + label {
  margin: 0.5vh 1vw;
  display: inline-block;
  cursor: pointer;
  height: 4vh;
  width: 17vw;
  border: 1px solid rgb(245, 109, 145);
  border-radius: 10px;
  line-height: 4vh; /* 세로 정렬을 위해 높이값과 일치*/
  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;
}
.dong input[type='checkbox'] + label {
  background-color: white;
  color: rgb(245, 109, 145);
}
/* 체크박스를 체크 했을 때 */
.dong input[type='checkbox']:checked + label {
  background-color: rgb(245, 109, 145);
  color: white;
}
.submit {
  display: block;
  margin-top: 4vh;
  font-size: 3em;
  float: right;
  color: rgb(245, 109, 145);
}
</style>
<style>
select {
  margin-top: 1.4vh;
  border: 1px solid rgb(245, 109, 145);
  border-radius: 10px;
  width: 25vw;
  height: 3.5vh;
}
.select {
  margin: 0 auto;
  margin-bottom: 2vh;
  text-align: center;
  width: 80vw;
  display: flex;
  justify-content: space-between;
}
</style>
