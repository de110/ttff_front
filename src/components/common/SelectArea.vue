<!--<template>
  <div class="select">
    <select
      id="select1"
      v-model="si"
      @change="selectArea('select1', 'select2')"
    >
      <option value="" disabled hidden>시</option>
      <option v-for="(item, index) in koreaRegion" :key="index" :value="index">
        {{ index }}
      </option>
    </select>
    <select
      id="select2"
      v-model="gungu"
      @change="selectArea('select2', 'select3')"
    >
      <option value="" disabled hidden>군구</option>
    </select>
    <select id="select3" v-model="dong" @change="setArea">
      <option value="" disabled hidden>읍면동</option>
    </select>
  </div>
</template>

<script>
import koreaRegion from '@/assets/koreaRegion.json';
export default {
  data() {
    return {
      url: '',
      si: '',
      gungu: '',
      dong: '',
      addDong: [],
      koreaRegion,
    };
  },
  created() {
    this.url = this.$route.path;
  },
  methods: {
    selectArea(area1, area2) {
      const select1 = document.getElementById(area1);
      const select2 = document.getElementById(area2);
      const mainArea = select1.options[select1.selectedIndex].value;
      const subArea = koreaRegion[mainArea];

      select2.options.length = 0;

      for (let i in subArea) {
        let opt = document.createElement('option');
        opt.value = subArea[i];
        opt.text = subArea[i];

        select2.appendChild(opt);
      }
    },
    setArea() {
      const area = {
        si: this.si,
        gungu: this.gungu,
        dong: this.dong,
      };
      this.$store.commit('setArea', area);
      if (this.url == '/myInfo') {
        this.addDong = [];
        this.addDong.push(this.dong);
        this.$store.commit('addDong', this.addDong);
      }
    },
  },
};
</script>
-->
<template>
  <div class="select">
    <select
      id="select1"
      v-model="sidoNm"
      @change="onChangeSi()"
    >
      <option value="" disabled hidden>시</option>
      <option v-for="(item, index) in cities" :key="index" :value="item">
        {{item}}
      </option>
    </select>
    <select
      id="select2"
      v-model="gunNm"
      @change="onChangeGun()"
    >
      <option value="" disabled hidden>군구</option>
      <option v-for="(item, index) in listGun" :key="index" :value="item">{{item}}</option>
    </select>
    <select id="select3" v-model="dongNm" @change="onChangeGun()" >
      <option value="" disabled hidden>읍면동</option>
      <option v-for="(item, index) in listDong" :key="index" :value="item.dongNm">{{item.dongNm}}</option>
    </select>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cities:[],
      listGun:[],
      listDong:[],
      sidoNm:'',
      gunNm:'',
      dongNm: '',
      addDong:[]
    };
  },
  created() {
    this.setSido();
  },
  methods: {
    setSido(){
      axios.get(`http://localhost:8081/api/regions/si`)
    .then((res) => {
      this.cities = res.data;
    });
    },

    onChangeSi(){
      axios.get(`http://localhost:8081/api/regions/gun?sido=${this.sidoNm}`)
    .then((res) => {
      this.listGun = res.data;
    });
    },

    onChangeGun(){
      axios.get(`http://localhost:8081/api/regions/dong?sido=${this.sidoNm}&gun=${this.gunNm}`)
    .then((res) => {
      this.listDong = res.data;
      localStorage.setItem('area', JSON.stringify({sidoNm:this.sidoNm,sigunguNm:this.gunNm,dongNm:this.dongNm}));
      this.$store.commit('setArea',{sidoNm:this.sidoNm,sigunguNm:this.gunNm,dongNm:this.dongNm})
      this.$store.commit('setAllDongList', res.data); // 전체 동 리스트
    });
    }
  },
};
</script>
<style scoped></style>
