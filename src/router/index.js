import Vue from 'vue'
import Router from 'vue-router'

const chatRoom = resolve => require(['../page/chatRoom'], resolve)
const login = resolve => require(['../page/login'], resolve)

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: 'login'
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/chatRoom',
            name: 'chatRoom',
            component: chatRoom
        }
    ]
})