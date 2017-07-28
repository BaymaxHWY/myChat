<template>
  <div class="Interface">
    <div class="banner">
      <h1 class="chat-title">聊天室</h1>
      <h2 class="info">在线人数：{{num}}</h2>
    </div>
    <chat :loginInfo="addInfo" :disconnectInfo="reduceInfo"></chat>
  </div>
</template>

<script>
import chat from '../components/chat.vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      addInfo: [],
      reduceInfo: []
    }
  },
  components: {
    chat
  },
  created() {
    if (!this.$store.state.logintoggle) {
      this.$router.replace('login');
      return;
    }
    if (localStorage.name != undefined) {
      this.$store.commit('setUsername', localStorage);
      this.$socket.emit('getInfo', { name: localStorage.name });
    }
  },
  computed: {
    num: {
      get: function () {
        if (this.$store.state.user.name == '') {
          this.$store.commit('uploadState', localStorage.state);
        }
        return this.$store.state.onlineCount;
      }
    }
  },
  sockets: {
    Info: function (msg) {
      this.$store.commit('addOnlineCount', msg);
      this.addInfo.push({ name: msg.username });
    },
    logout: function (msg) {
      if (this.$store.state.user.name == msg.username) {
        this.$store.commit('deleteUsername');
        this.$store.commit('closeLoginToggle');
      }
      this.$store.commit('reduceOnlineCount');
      this.reduceInfo.push({ name: msg.username });
    }
  }
}
</script>

<style>
.Interface {
  background-color: #D3DCE6;
  width: 600px;
  height: 700px;
  margin: 0 auto;
  padding: 5px;
}

.banner {
  height: 80px;
}
</style>
