<template>
  <div>
    <div class="goods-info" @click=" goDetail(goodsId)">
      <div class="img"><img :src="goodsImage" alt="" width="100%"></div>
      <div class="name">{{ goodsName }}</div>
       <div class="company">单价：{{ goodsPrice | formatPrice }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['goodsImage','goodsName','goodsPrice','goodsId'],
    methods: {
      goDetail(goodsId){
        this.$router.push({
          name: 'goods',
          query: {goodsId:goodsId}
        })
      }
    },
    filters: {
      formatPrice(value){
        return '￥'+value.toFixed(2);
      }
    }
  }
</script>

<style  scoped>
.goods-info .img img{
  height: 9rem;
}
.goods-info div{
  text-align: center;
  font-size: 14px;
  line-height: 200%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>