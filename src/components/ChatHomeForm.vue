<template>
  <div>
    <ul v-for="(item, index) in chatrooms" :key="index">
      <li>
        <i class="fa-solid fa-face-smile smile"></i>
        <i
          class="fa-solid fa-circle-minus delete"
          @click="deleteRoom(item.roomId)"
        ></i>
        <template v-if="user == item.host.memberId">
          <div class="chat-name" @click="enterRoom(item.roomId)">
            <h3>{{ item.roomName }}</h3>
            <h2>{{ item.guest.memberId }}</h2>
          </div>
          <i
            class="fa-solid fa-user-plus plus"
            @click="addMember(item.roomName, item.guest)"
          ></i>
        </template>
        <template v-else>
          <div class="chat-name" @click="enterRoom(item.roomId)">
            <h3>{{ item.roomName }}</h3>
            <h2>{{ item.host.memberId }}</h2>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios';
import { deleteChatRoom, addMembers, deleteChaMessages } from '@/api/index.js';
export default {
  data() {
    return {
      user: '',
      //   title: '',
      //   guest: '',
      // chatrooms: [],
    };
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem('user')).userId;
    await this.$store.dispatch('findChatRoom', this.user);

    // this.title = '토토토토익';
    // this.guest = '쑤우';
    // this.findAllRoom();
  },
  computed: {
    chatrooms() {
      // this.$store.dispatch('findChatRoom', this.host);
      return this.$store.state.Study.chatRooms;
    },
  },
  methods: {
    // findAllRoom() {
    //   axios.get('/chat/rooms').then(response => {
    //     this.chatrooms = response.data;
    //   });
    // },
    enterRoom(roomId) {
      const sender = JSON.parse(localStorage.getItem('user')).userId;
      if (sender != '') {
        localStorage.setItem('wschat.sender', sender);
        localStorage.setItem('wschat.roomId', roomId);
        location.href = '/chat/room/enter/' + roomId;
      }
    },
    deleteRoom(roomId) {
      deleteChatRoom(roomId);
      deleteChaMessages(roomId);
      // axios.delete('/chat/roominfo?roomId=' + roomId);
      // axios.delete('/chat/messages?roomId=' + roomId);
    },
    addMember(title, member) {
      const addInfo = {
        title: title,
        member: member,
      };
      addMembers(addInfo);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');
div {
  margin: 0 auto;
}
ul {
  padding: 0;
  margin: 0 auto;
  list-style-type: none;
}
li {
  position: relative;
  margin: 0 auto;
  border: 1px solid rgb(223, 223, 222);
  width: 85vw;
  height: 12vh;
  border-top: 0;
  border-left: 0;
  border-right: 0;
}
.smile {
  line-height: 10vh;
  font-size: 4.1em;
  float: left;
  color: rgb(141, 141, 170);
}
.delete {
  position: absolute;
  top: 3vh;
  left: 80vw;
  line-height: 12vh;
  font-size: 2em;
  float: right;
  color: rgb(141, 141, 170);
}
.chat-name {
  position: relative;
  width: 70vw;
  /* line-height: 14vh; */
  font-family: 'Gothic A1', sans-serif;
  text-align: center;
}
.plus {
  position: absolute;
  font-size: 2em;
  float: right;
  top: 0;
  left: 80vw;
  color: rgb(141, 141, 170);
}
h2 {
  margin: 0 auto;
  /* display: inline-block; */
  /* margin: 0; */
  /* padding-top: 1vh; */
  font-size: 2.3em;
}
h3 {
  /* margin: 0; */
  margin-bottom: 1vh;
  color: rgb(141, 141, 170);
  height: 3vh;
  font-size: 1.4em;
}
</style>
