import axios from 'axios';

const Study = {
  state: {
    myStudyList: [],
    studyInfo: '',
    homeList: [],
    attendList: [],
    attendNum: 0,
    lateNum: 0,
    absenceNum: 0,
    myAttendNum: 0,
    myLateNum: 0,
    MyAbsenceNum: 0,
    year: '',
    month: '',
    day: '',
    allDongList: [], // 전체 지역 동 리스트
    myDongList: [], // 유저가 선택한 동 리스트
    chatRooms: [],
    area: '',
    setDong: '',
  },
  mutations: {
    addAttend(state, payload) {
      state.attendList = payload;
    },
    nowStudy(state, payload) {
      state.studyInfo = payload;
    },
    myStudyList(state, payload) {
      state.myStudyList = payload;
    },
    studyList(state, payload) {
      state.homeList = payload;
    },
    attend(state) {
      state.attendNum++;
    },
    late(state) {
      state.lateNum++;
    },
    absence(state) {
      state.absenceNum++;
    },
    initAttend(state) {
      state.attendNum = 0;
      state.lateNum = 0;
      state.absenceNum = 0;
    },
    myAttend(state) {
      state.myAttendNum++;
    },
    myLate(state) {
      state.myLateNum++;
    },
    myAbsence(state) {
      state.myAbsenceNum++;
    },
    initMyAttend(state) {
      state.myAttendNum = 0;
      state.myLateNum = 0;
      state.myAbsenceNum = 0;
    },
    async clickDate(state, payload) {
      state.year = await payload.year;
      state.month = await payload.month;
      state.day = await payload.day;
    },
    setAllDongList(state, payload) {
      state.allDongList = payload;
    },
    dongList(state, payload) {
      state.myDongList = payload;
    },
    ChatRoomList(state, payload) {
      state.chatRooms = payload;
    },
    setArea(state, payload) {
      state.area = payload;
    },
    initArea(state) {
      state.area = '';
    },
    addDong(state, payload) {
      state.setDong = payload;
    },
  },
  actions: {
    /* check */
    async setStudy({ commit }, payload) {
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8081'}/${payload.type}?id=${payload.id}`)
        .then(res => {
          commit('nowStudy', res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    /* 동 선택 후 게시글 목록 */
    async afterSelect({ commit }, payload) {
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8081'}/${payload.type}?dong=${payload.dong}`)
        .then(res => {
          commit('studyList', res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    async setAttend({ commit }, payload) {
      payload
      await axios.get(`${'http://localhost:8081'}/member`).then(res => {
        const filterMyStudy = [];
        res.data.filter(d => {
          // if (d.member.memberId == payload) {
          return filterMyStudy.push(d);
          // }
        });
        commit('myStudyList', filterMyStudy);
        // commit('myStudyList', res.data);

      });
    },

    async getDongList({ commit }, payload) {
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8081'}/api/region?id=${payload}`).then(res => {
        commit('dongList', res.data.dongNm);
      });
    },

    /* 게시글 목록 기본 설정.
    사용자가 설정한 지역을 기반으로 카테고리 분류와는 상관 없이 전체 게시글 목록 보여줌 */
    async setStudyList({ commit }, payload) {
      const lists = [];
      await axios.get(`${'http://localhost:8081'}/boards?dong=${payload}`).then(res => {
        res.data.filter(e => {
          lists.push(e);
        });
      });
      commit('studyList', lists);
    },

    /* 동 미선택, 카테고리 선택 시 기본 설정 값으로 게시글 목록 보여줌 */
    async beforeSelect({ commit }, payload) {
      const lists = [];
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8081'}/${payload.type}?dong=${payload.dong}`).then(res => {
        res.data.filter(e => {
          lists.push(e);
        });
      });
      commit('studyList', lists);
    },

    async getAttend({ commit }, payload) {
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8081'}/studyAttend?studyName=${payload}`)
        .then(res => {
          commit('addAttend', res.data);
        });
    },

    async teamAttend({ commit }, payload) {
      commit('initAttend');
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8081'}/studyAttend?studyName=${payload.studyName}`)
        .then(res => {
          res.data.filter(e => {
            if (e.name == payload.studyUser) {
              if (e.attend == '출석') {
                commit('attend');
              } else if (e.attend == '지각') {
                commit('late');
              } else {
                commit('absence');
              }
            }
          });
        });
    },

    myAttend({ commit }, payload) {
      commit('initMyAttend');
      // eslint-disable-next-line prettier/prettier
      axios.get(`${'http://localhost:8081'}/studyAttend?studyName=${payload}`)
        .then(res => {
          res.data.filter(e => {
            const user = JSON.parse(localStorage.getItem('user')).userId;
            if (e.name == user) {
              if (e.attend == '출석') {
                commit('myAttend');
              } else if (e.attend == '지각') {
                commit('myLate');
              } else {
                commit('myAbsence');
              }
            }
          });
        });
    },
    /* check */
    async findChatRoom({ commit }, payload) {
      // const chatRoom = [];
      payload
      // eslint-disable-next-line prettier/prettier
      await axios.get(`${'http://localhost:8081'}/chat/rooms?userId=${payload}`).then(res => {
        // chatRoom.push(res.data);
        //   .filter(e => {
        //   if (e.guest == payload || e.host == payload) {
        //     return chatRoom.push(e);
        //   }
        // });
        // chatRoom.push(res.data);
        // commit('ChatRoomList', chatRoom);
        commit('ChatRoomList', res.data);

      });
    },
  },
  getters: {
    showAttend: state => {
      return state.attendList.filter(
        attend =>
          attend.createdAt == state.year + '-' + state.month + '-' + state.day,
      );
    },
  },
};
export default Study;
