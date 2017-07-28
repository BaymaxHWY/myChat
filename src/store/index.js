import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            name: ''
        },
        msghistory: {
            info: ''
        },
        logintoggle: false,
        onlineCount: 0,
    },
    getters: {
        getUsername: state => state.user.name,
        getLoginstatus: state => state.logintoggle,
        getOnlineCount: state => state.onlineCount,
    },
    mutations: {
        setUsername(state, data) {
            state.user.name = data.name;
        },
        openLoginToggle(state) {
            state.logintoggle = true;
        },
        closeLoginToggle(state) {
            state.logintoggle = false;
        },
        addOnlineCount(state, data) {
            state.onlineCount = data.onlineCount;
        },
        reduceOnlineCount(state) {
            state.onlineCount--;
        },
        uploadState(state, data) {
            state = data;
        },
        deleteUsername(state) {
            state.user.name = '';
        }
    }
})