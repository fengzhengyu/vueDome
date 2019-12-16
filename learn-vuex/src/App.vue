<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div>
        {{$store.state.lesson}} {{ lesson}} {{ room }} {{$store.state.user.userName}}
    </div>
    <div>
       {{$store.getters.getNewName}} {{getNewName}}    {{ getUserName }}
    </div>
    <div>
      <button @click="changeRoom">点击+1</button>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapState ,mapGetters} from 'vuex'
export default {
  computed:{
    ... mapState(['lesson']),
    ...mapGetters(['getNewName']),
    ...mapGetters('user',['getUserName']),
    room(){
      return this.$store.state.room;
    },
   
  },
  methods: {
    changeRoom(){
      // this.$store.commit('change_room','302')
      // this.$store.commit('user/change_name','我是改变的了user模块')
      this.$store.dispatch('change_room','888')
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
