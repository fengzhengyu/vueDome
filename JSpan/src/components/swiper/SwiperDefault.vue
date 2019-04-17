<template>
  <div>
    <swiper >
     
      <swiper-slide v-for="(item,index) in slide" :key="index">
        slide {{ item }}
      </swiper-slide>
       
      

    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
 
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    components: {
      swiper, 
      swiperSlide
    },
    data(){
      return {
        slide: [1,2,3,4],
        
      }
    }
  }
</script>

<style  scoped>
  
</style>