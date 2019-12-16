import Vue from 'vue'
import App from './App.vue'
import router from './router' //注册到根实例
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false


router.beforeEach((to,from,next)=>{
  console.log(to.matched)
  // 只要有一项为true 则为true  数组的方法 some    over方法 所有为true
  if(to.matched.some((m)=> m.meta.needLogin)){ //需要登录
    if(localStorage.getItem('login')){ //有没有登录
      next();
    }else{
      next('/')
    }

  }else{
    next()
  }
})

new Vue({
  router, //$router 方法 $route 属性
  render: h => h(App)
}).$mount('#app')
