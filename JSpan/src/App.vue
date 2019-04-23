<template>
  <div id="app">
        <keep-alive>
        <router-view v-if="$route.meta.keepAlive" >
        </router-view>
    </keep-alive>
    <router-view  v-if="!$route.meta.keepAlive">
    </router-view>
    
    <!-- <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app{
    background: #f5f5f5;
  }
</style>
