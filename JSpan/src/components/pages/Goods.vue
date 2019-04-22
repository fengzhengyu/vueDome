<template>
  <div>

  </div>
</template>

<script>
  import axios from 'axios'
  import URL from '@/assets/js/serverApi.js'
  export default {
    data(){
      return {
        goodsId: ''
      }
    },
    created(){
      this.goodsId =  this.$route.query.goodsId
      this.getDetail()
     
    },
    methods: {
      getDetail(){
        axios({
          url: URL.goodsDetail,
          method: 'post',
          data: { goodsId: this.goodsId}
        }).then(response=>{
          let res = response.data
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style  scoped>

</style>