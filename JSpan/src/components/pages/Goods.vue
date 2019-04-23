<template>
  <div>
    <div>
      <van-nav-bar title="详情页" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="topimage-div">
      <img :src="goodsItem.IMAGE1" width="100%">
    </div>
    <div class="goods-name">{{goodsItem.NAME}}</div>
    <div class="goods-price">价格 ：￥{{goodsItem.PRESENT_PRICE }}元</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsItem.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">评论制作中</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import URL from "@/assets/js/serverApi.js";
export default {
  data() {
    return {
      goodsId: "",
      goodsItem: {}
    };
  },
  created() {
    this.goodsId = this.$route.params.goodsId?this.$route.params.goodsId:this.$route.query.goodsId;
    this.getDetail();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getDetail() {
      axios({
        url: URL.goodsDetail,
        method: "post",
        data: { goodsId: this.goodsId }
      })
        .then(response => {
          let res = response.data;
          this.goodsItem = res.message;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "category") {
      to.meta.isUseCache = true;
    }
    next();
  }
};
</script>

<style  scoped>
   .goods-name{
        background-color: #fff;
        font-size: 16px;
        height: 2rem;
        line-height: 2rem;
        text-align: center
    } 
    .goods-price{
        background-color: #fff;
        font-size: 16px;
          height: 2rem;
        line-height: 2rem;
        text-align: center
    }
    .detail {
        font-size:0px;
    }
    .goods-bottom{
        position:fixed;
        bottom:0px;
        left:0px;
        background-color: #FFF;
        width:100%;
        display: flex;
        flex-direction: row;
        flex-flow:nowrap;
    }

    .goods-bottom > div {
        flex:1;
        padding:5px;
    }
</style>