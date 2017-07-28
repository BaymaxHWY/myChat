<template>
  <div class="login">
    <h1>输入昵称</h1>
    <el-input v-model.trim="name" placeholder="请输入您的昵称" v-on:keyup.enter.native="login"></el-input>
    <el-button type="primary" @click="login">确定</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    login: function () {
      if (this.name === '') return;
      this.$store.commit('openLoginToggle');
      localStorage.name = this.name;
      this.$socket.emit('checkName', { name: localStorage.name });
    }
  },
  created() {
    localStorage.clear();
    if (this.$store.state.logintoggle) {
      this.$router.replace('chatRoom');
    }
  },
  sockets: {
    userExist: function () {
      this.$message({
        showClose: true,
        message: '用户名已存在，请重新输入',
        type: 'error'
      });
      this.name = '';
    },
    userCreated: function () {
      this.$router.push('chatRoom');
    }
  }
}
</script>

<style>
.login {
  text-align: center;
  color: #F9FAFC;
  width: 50%;
  margin: auto;
}
</style>
