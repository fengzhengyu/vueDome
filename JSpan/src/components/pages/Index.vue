<template>
  <div>

    <div class="search-bar">
      <van-row class>
        <van-col span="3">
          <img :src="locationIcon" width="80%">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>

    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item,index) in banner" :key="index">
          <img v-lazy="item.imageUrl" width=" 100%">
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="type-bar">
      <div v-for="(item,index) in categorg" :key="index" class="type-item">
        
        <img v-lazy="categorgimg"  width=" 90%">
        <span>{{ item.goodsParentsName.substring(0,4) }}</span>
      </div>
    </div>

    <div>
      <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1944053329,4270985035&fm=26&gp=0.jpg"  width=" 100%" height="150px">
    </div>

    <div class="recommend-are">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
         <swiper :options="swiperOption" >
          <swiper-slide v-for="(item,index) in recommend " :key="index">
            <div class="recommend-item">
                <img :src="item.photoUnify" width="80%">
                <div>{{ item.goodsName }}</div>
                <div>{{ item.productCompany }}</div>
            </div>
          </swiper-slide>
      
        </swiper>
      </div>
    </div>
    <!-- <div>

      <swiper-default></swiper-default>
      
    </div>
    <div>
      
      <swiperTest></swiperTest>
    </div> -->
    <floor-component
      v-if="floorName.length"
      :floorData="floorData" 
      :floorTitle="floorName[0]['goodsParentsName']"

    ></floor-component>

    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!-- 需要list 组件
         v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        
         -->
        <van-list
         
        >
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goodsInfo :goodsImage="item.photoUnify" :goodsName="item.goodsName" :goodsCompany="item.productCompany"></goodsInfo>
            </van-col>
          </van-row>
        </van-list>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import swiperDefault from '../swiper/SwiperDefault'
import  swiperTest from '../swiper/SwiperTest'
import  floorComponent from '../common/FloorComponent'
import  goodsInfo from '../common/GoodsComponent'
export default {
  components: {
    swiper,
    swiperSlide,
    swiperDefault,
    swiperTest,
    floorComponent,
    goodsInfo
  },
  data() {
    return {
      locationIcon: require("../../assets/img/location.png"),
      banner: [
        {
          imageUrl:
            "https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg"
        },
        {
          imageUrl:
            "https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg"
        },
        {
          imageUrl:
            "https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg"
        }
      ],
      categorg: [],
      categorgimg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556010570&di=ec85ae9226c44c4706fbe5fa0aad0633&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011b21583bd7b7a8012060c8873d4c.png%402o.png",
      recommend :[],
      swiperOption:{
       
        slidesPerView:2
      },
      floorData: [],
      floorName: [],
      hotGoods : []
     
  };
  },
  created() {
    axios({
      url: "http://www.ey99.com/ddyk/Api/Goods/selectGoodsIndex",
      method: "get",
      params: {
        // page:3
      }
    }).then(response => {
      var res = response.data;
      console.log(res);
      if (res.flag == "success") {
        this.categorg = res.data;
        this.recommend = res.adGoodsData;
        this.floorData = res.data[0].typeData;
        this.floorName = res.data;
       
        this.hotGoods = res.data[0].typeData
      
      }
    });
  }
};
</script>

<style  scoped>
.search-bar {
  height: 2.2rem;
  background: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  height: 1.3rem;
  width: 100%;
  border-width: 0;
  border-bottom: 1px solid #fff;
  background: #e5017d;
}
.banner {
  max-height: 13rem;
  clear: both;
}
.banner img {
  height: 13rem;
}

.type-bar{
  background: #fff;
  margin: 0 .3rem .3rem .3rem;
  font-size: 14px;
  border-radius: .3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap

}
.type-item{
  width: 20%;
  text-align: center;


}
.recommend-are{
  background: #fff;
  margin-top: .3rem;

}
.recommend-title{
  border-bottom: 1px solid #eee;
  color: #e5017d;
  font-size: 14px;
  padding: .2rem;
}
.recommend-body{
  border-bottom: 1px solid #eee;
}
.recommend-item{
  width: 99%;
  font-size: 12px;
  text-align: center;
  border-right: 1px solid #eee;
}
.recommend-item img{
  height: 6rem;
}
.hot-title{
  height: 1.8rem;
  line-height: 1.8rem;
  font-size: 14px;
  text-align: center;
  font-weight: 700;
}
</style>