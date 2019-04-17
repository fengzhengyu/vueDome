<template>
  <div>
    <div class="goods-info">
      <div class="img"><img :src="goodsImage" alt="" width="100%"></div>
      <div class="name">{{ goodsName }}</div>
       <div class="company">{{ goodsCompany }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['goodsImage','goodsName','goodsCompany']
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