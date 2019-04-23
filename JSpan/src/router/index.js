import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/Index.vue'
import Register from '@/components/pages/Register.vue'
import Login from '@/components/pages/Login.vue'
import Goods from '@/components/pages/Goods.vue'
import Category from '@/components/pages/Category.vue'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/',
  routes: [
   
    {
      path: '/',
      name: 'home',
      component: Index,
      meta: {
        keepAlive: true
      }
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
    },
     {
      path: '/goods/:goodsId',
      name: 'goods',
      component: Goods
    },
    {
      path: '/category',
      name: 'category',
      component: Category,
      meta: {
        keepAlive: true
      }
    },
    
  ],
  scrollBehavior (to, from, savedPosition) {
   
   
    if (savedPosition) {
    
      return savedPosition;
    } else {
       return { x: 0, y: 0 }
    }
  }
})
