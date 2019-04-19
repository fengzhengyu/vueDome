import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index.vue'
import Register from '@/components/pages/Register.vue'
import Login from '@/components/pages/Login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
     {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
