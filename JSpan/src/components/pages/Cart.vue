<template>
  <div>
      <div>
        <van-nav-bar title="购物车">

        </van-nav-bar>
      </div>
      <div class="cart-title">
          <van-button size="small" type="danger" @click="clearCart" >
          清空购物车
          </van-button>  
      </div>
      <!-- 显示购物车商品 -->
      <div class="cart-list">
        <div class="item-row" v-for="(item,index) in cartList" :key="index">
          <div class="item-img">
            <img :src="item.image" width="100%">
          </div>
          <div class="item-text">
            <div class="goods-name"> {{ item.name }}</div>
            <div class="goods-control">
              <van-stepper v-model="item.num"   @change="onChange"/>
            </div>
           
          </div>
          <div class="item-price">
              <div>
                ￥{{ item.price | formatPrice}}
              </div>
              <div>
                x{{ item.num }}
              </div>
              <div class="all-price">
                ￥{{ item.num* item.price | formatPrice}}
              </div>
          </div>

        </div>
        <div>

          <van-submit-bar
            :price="totalPrice"
          
            button-text="提交订单"
            @submit="onSubmit"
          />
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    data (){
      return {
         cartList: [],
         isEmpty: false, //购物车是否为空
      
      }
    },
    created(){
     this.getCartInfo()
    },
    computed:{
      totalPrice (){

        let val = 0;
        this.cartList.forEach((item,index)=>{
        
          val += item.num * item.price *100;
        })
        localStorage.cartInfo= JSON.stringify(this.cartList);
        return  val;
      }
    },
    filters: {
      formatPrice(val){
        return val.toFixed(2)
      }
    },
    methods: {
      getCartInfo(){
        if(localStorage.cartInfo){
          this.cartList = JSON.parse(localStorage.cartInfo)
        }
        console.log(JSON.stringify( this.cartList))
        this.isEmpty = this.cartList.length>0? true: false;

      },
      clearCart(){
        localStorage.removeItem('cartInfo');
        this.cartList = []
      },
      onChange(value){
      

      },
      onSubmit(){

      }
    }
  }
</script>

<style  scoped>
.cart-title{
  height: 2rem;
  line-height: 2rem;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list{
  background-color: #fff;
  padding-bottom: 80px;

}
.item-row{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.item-img{
  flex:  6;
}
.item-text{
  flex:  14;
  padding-left: 10px;

}
.goods-name{

}
.item-price{
  display:4;
  text-align: right;
  
}
.all-price{
  color: red;
}
.goods-control{
  padding-top: 40px;
  text-align: center;
}
</style>