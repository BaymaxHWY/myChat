<template>
  <div>
    <div class="chat-contents">
      <p class="user-add" v-for="(item, index) in loginInfo" :key="index">System：{{item.name}} joined</p>
      <p class="user-left" v-for="(item, index) in disconnectInfo" :key="index">System：{{item.name}} left</p>
      <div v-for="(item, index) in msgList" :key="index">
        <div class="box-left" v-if="item.type == 2">
          <div class="left">
            <img src="../image/guarantee.png" alt="头像">
          </div>
          <div class="center">
            <p class="username">{{item.username}}</p>
            <p class="msg">{{item.msg}}</p>
          </div>
        </div>
        <div class="box-right" v-if="item.type == 3">
          <div class="right">
            <img src="../image/guarantee.png" alt="头像">
          </div>
          <div class="center">
            <p class="username">{{item.username}}</p>
            <p class="msg">{{item.msg}}</p>
          </div>
        </div>
      </div>
      <div class="chat-right"></div>
    </div>
    <div class="edit">
      <div></div>
      <el-row>
        <el-col :span="21">
          <el-input type="textarea" placeholder="请输入您要发送的内容" :autosize="{ minRows: 1, maxRows: 2}" v-model.trim="msgInput" @keyup.enter.native="sendMsg"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="sendMsg">发送</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      msgList: [],
      msgInput: '',
    }
  },
  props: {
    loginInfo: Array,
    disconnectInfo: Array
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
    sendMsg: function () {
      if (this.msgInput == '') return;
      this.$socket.emit('postMsg', this.msgInput);
      this.msgInput = '';
    }
  },
  sockets: {
    newMsg: function (msg) {
      console.log(msg);
      let t = 3;
      if (this.$store.state.user.name != msg.username) t = 2;
      this.msgList.push({
        type: t,
        username: msg.username,
        msg: msg.msg
      });
    }
  }
}
</script>

<style>
.chat-contents {
  height: 500px;
  margin: 20px auto 20px auto;
  background-color: #F9FAFC;
}

.edit {
  height: 100px;
}

.user-add {
  color: #20A0FF;
}

.user-left {
  color: #F7BA2A;
}

.box-left {
  width: 50%;
  display: flex;
  padding: 8px;
}

.box-right {
  width: 50%;
  margin-left: 48%;
  display: flex;
  justify-content: flex-end;
  padding: 8px;
}

.left,
.right {
  width: 50px;
  height: 50px;
  margin: 0;
}

.box-left .username {
  text-align: left;
  margin-left: 20px;
}

.box-right .username {
  text-align: right;
  margin-right: 20px;
}

img {
  height: 100%;
}

.username {
  margin: 0;
  color: #13CE66;
  font-size: 12px;
}

.msg {
  display: block;
  background-color: #8492A6;
  padding: 10px;
  border-radius: 5px;
  margin: 0 10px 0 10px;
  position: relative;
  text-align: left;
  max-width: 300px;
  word-wrap: break-word;
  word-break: normal;
}

.box-left .msg::before {
  content: "\E605";
  font-family: element-icons!important;
  position: absolute;
  left: -10px;
  top: 4px;
  color: #8492A6;
}

.box-right .right {
  order: 3;
}

.box-right .msg::before {
  content: "\E606";
  font-family: element-icons!important;
  position: absolute;
  right: -10px;
  top: 4px;
  color: #8492A6;
}
</style>
