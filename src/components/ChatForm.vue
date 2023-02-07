<template>
  <div>
    <page-name>
      <h1 slot="title">{{ room.roomName }}</h1>
      <i slot="icon" class="fa-solid fa-chevron-left" @click="back"></i>
    </page-name>
    <div>
      <ul v-for="(item, index) in messages" :key="index" class="ul-container">
        <template v-if="user == item.sender">
          <div class="right-container">
            <div>
              {{ item.sender.memberId }}
            </div>
            <li class="right">
              <div>
                {{ item.message }}
              </div>
            </li>
          </div>
        </template>
        <template v-else-if="item.type == 'ENTER'">
          <div class="center">
            <li>{{ item.message }}</li>
          </div>
        </template>
        <template v-else>
          <div class="left-container">
            <div>
              {{ item.sender.memberId }}
            </div>
            <li class="left">
              <div>
                {{ item.message }}
              </div>
            </li>
          </div>
        </template>
      </ul>
    </div>
    <div class="text-container">
      <div class="text-input">
        <input type="text" v-model="message" @keypress.enter="sendMessage" />
        <span class="send">
          <i class="fa-solid fa-location-arrow arrow" @click="sendMessage"></i>
        </span>
      </div>
    </div>

    <!-- <div id="app" v-cloak>
      <div>
        <h2>{{ room.roomName }}</h2>
      </div>
      <div>
        <div>
          <label>내용</label>
        </div>
        <input type="text" v-model="message" @keypress.enter="sendMessage" />
        <div>
          <button type="button" @click="sendMessage">보내기</button>
        </div>
      </div>
      <ul>
        <li v-for="message in messages" :key="message">
          {{ message.sender }} - {{ message.message }}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import PageName from './common/PageName.vue';
import axios from 'axios';
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
export default {
  components: { PageName },
  //   // el: '#app',
  data() {
    return {
      roomId: '',
      room: {},
      sender: '',
      message: '',
      messages: [],
      ws: null,
      user: '',
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user')).userId;
    this.roomId = localStorage.getItem('wschat.roomId');
    this.sender = localStorage.getItem('wschat.sender');
    // 채팅방 제목
    // eslint-disable-next-line prettier/prettier
      axios.get(`${'http://localhost:8081'}/chat?roomId=${this.roomId}`)
      .then(res => {
        this.room = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 이전 채팅 내용
    // eslint-disable-next-line prettier/prettier
    axios.get(`${'http://localhost:8081'}/messages?roomId=${this.roomId}`).then(res => {
        this.messages = [];
        for (let i = 0; i < res.data.length; i++) {
          let msg = {
            type: res.data[i].type,
            sender: res.data[i].type == 'ENTER' ? '[알림]' : res.data[i].sender,
            message: res.data[i].message,
          };
          this.messages.unshift(msg);
        }
      });
    // socket 연결
    let sock = new SockJS('/ws');
    this.ws = Stomp.over(sock);
    // this.ws.connect(
    //   {},
    //   frame => {
    //     console.log('success', frame);
    //     this.ws.subscribe('/sub/chat/room/' + this.roomId, message => {
    //       let recv = JSON.parse(message.body);
    //       console.log(recv);
    //       this.recvMessage(recv);
    //     });
    //     this.ws.send(
    //       '/pub/chat/message',
    //       JSON.stringify({
    //         type: 'ENTER',
    //         roomId: this.roomId,
    //         sender: this.sender,
    //       }),
    //     );
    //   },
      // error => {
      //   if (reconnect++ <= 5) {
      //     setTimeout(function() {
      //       console.log('connection reconnect');
      //       // sock = new SockJS("/ws");
      //       // ws = Stomp.over(sock);
      //       // this.connect();
      //     }, 10 * 1000);
      //   }
      // },
    // );
  },
  methods: {
    findRoom() {
      axios.get('/chat/room/' + this.roomId).then(response => {
        this.room = response.data;
      });
    },
    sendMessage() {
      this.ws.send(
        '/pub/chat/message',
        JSON.stringify({
          type: 'TALK',
          roomId: this.roomId,
          sender:{
            memberId:this.sender,
            },
          message: this.message,
        }),
      );
      this.message = '';
    },
    recvMessage(recv) {
      this.messages.unshift({
        type: recv.type,
        sender: recv.type == 'ENTER' ? '[알림]' : recv.sender,
        message: recv.message,
      });
      console.log(this.messages)
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap');
.text-container {
  width: 90vw;
  margin: 0 auto;
  text-align: center;
}
.text-input {
  position: fixed;
  bottom: 2vh;
  height: 6vh;
  width: 90vw;
  margin: 0 auto;
}
input {
  width: 79vw;
  height: 6vh;
  border: 1px solid rgb(245, 109, 145);
  border-radius: 5px 0 0 5px;
  /* border-right: none; */
}
.send {
  height: 6.7vh;
  width: 5vh;
  float: right;
  display: block;
  background-color: rgb(245, 109, 145);
  border-radius: 0 5px 5px 0;
}
.arrow {
  line-height: 6.7vh;
  width: 5vh;
  font-size: 2.2em;
  color: white;
  vertical-align: middle;
}
.ul-container {
  padding: 0;
  margin: 0 auto;
  width: 86vw;
  list-style: none;
}
li {
  font-family: 'Gothic A1', sans-serif;
  display: inline-block;
  font-size: 1.2em;
  margin: 1vh auto;
}
.right-container {
  text-align: right;
}
.left-container {
  text-align: left;
}
.left {
  padding: 1vh 2vw;
  border-radius: 5px;
  border: 2px solid rgb(57, 62, 70);
}
.right {
  padding: 1vh 2vw;
  border-radius: 5px;
  border: 2px solid rgb(245, 109, 145);
}
.center {
  text-align: center;
}
.add-container {
  margin: 0 auto;
  width: 86vw;
}
.plus {
  width: 86vw;
  position: absolute;
  top: 85vh;
  font-size: 2em;
  color: rgb(245, 109, 145);
  text-align: right;
}
</style>
