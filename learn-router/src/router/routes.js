

// 1. 引入路由件
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import User from '../views/User.vue'
import UserAdd from '../views/UserAdd.vue'
import UserList from '../views/UserList.vue'
import UserDetail from '../views/UserDetail.vue'

// 2. 设置映射表，路由与组件的对应关系
let routes = [
  {
    path: '/home',
    name:'home',
    component:Home
  },
  {
    path: '/profile',
    name:'profile',
    component:Profile,
    meta: {
      needLogin: true
    }
  },
  {
    path: '/user',
    name:'user',
    component:User,
    children: [
      {
        path: 'add',
        // component: ()=>import(/*webpackChunkName: "a"*/'../views/UserAdd.vue')
        component: ()=>import('../views/UserAdd.vue')
      },
      {
        path: 'list',
        component: ()=>import('../views/UserList.vue')
      },
      {
        path: 'detail/:id',
        component: ()=>import('../views/UserDetail.vue')
      }
    ]
  },
  {
    path: '/',
    redirect:{
      path: '/home'
    }
  }

];

export default routes;