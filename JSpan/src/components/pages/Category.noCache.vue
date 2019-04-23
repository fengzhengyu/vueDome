<template>
  <div>
    <div>
      
      <van-nav-bar
        title="分类页"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      
      />
    </div>
   
    <div>
      <van-row>
        <van-col span="6" >
          <div id="categoryNav">
              <ul >
                <li
                  v-for="(item,index) in category"
                  :key="index"
                  :class="{ categoryActice:categpryIndex == index}"
                  @click="clickCategory(index,item.ID)"
                >{{ item.MALL_CATEGORY_NAME }}</li>
              </ul>
          </div>
          
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab :title="item.MALL_SUB_NAME" v-for="(item,index) in categorySub" :key="index"></van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-list 
                v-model="loading" 
                :finished="finished" 
                finished-text="没有更多了" 
                @load="onLoadMore"
                id="goodsList"
                >
                <div v-for="(item,index) in goodsList " :key="index" class="list-item" @click="goDetail(item.ID)">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE }}</div>
                    <!-- | moneyFilter                                 -->
                  </div>
                </div>
              </van-list>
            </van-pull-refresh> 
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import URL from "@/assets/js/serverApi.js";
export default {
  data() {
    return {
      category: [],
      categpryIndex:0,
      active: 0,
      categorySub: [],
      categorySubId: "", //子类id
      goodsList: [],
      page: 1,
      loading: false,
      finished: false,
      errorImg: 'this.src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556592324&di=0791d201681b913cf3b20c853e7f71f8&imgtype=jpg&er=1&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F37%2F86%2F37573c65819a30c.jpg"',
      isLoading: false,
      scroll: 0
    };
  },

  created() {
    // activated
    this.categpryIndex = this.$route.query.id || 0
  
     console.log( this.categpryIndex)
      this.getCategroyList();
  },
  mounted() {
    let width =
      document.documentElement.clientHeight || document.body.clientHeight;
      document.getElementById("categoryNav").style.height = width - 46+ "px";
      document.getElementById("list-div").style.height = (width - 90 -5)  + "px";
  },
  watch: {
    '$route' (to, from){
      if(to.meta.isUseCache){
          document.getElementById("list-div").scrollTop = to.meta.scrollTop;
          to.meta.scrollTop = 0;
     
          to.meta.isUseCache= false
      }
      if(this.$route.query){
           // console.log(this.$route.query)
          
           this.getCategroyList();
      }
    }
  },
  methods: {
    
    onClickLeft() {
      this.$router.push('/');
    },
    onClickRight() {
      this.$toast("按钮");
    },
    // 获取大分类
    getCategroyList() {
      console.log('zou')
      axios({
        url: URL.categoryList,
        method: "get"
      }).then(response => {
        let res = response.data;
        if (res.code == 200) {
          this.category = res.message;
 console.log(this.category[this.categpryIndex].ID)
          this.getCategorySubList(this.category[this.categpryIndex].ID);
        }
        //  console.log(res)
      });
    },
    // 点击大分类 切换数据
    clickCategory(index, categoryId) {
      this.categpryIndex = index;
      this.page = 1;
      this.loading = true;
      this.finished = false;
      this.goodsList = [];
      // // console.log(categoryId)
      // this.getCategorySubList(categoryId); //获取小类数据

        this.$router.push({name:'category',query:{id:index}})
    },
    // 获取小分类
    getCategorySubList(categoryId) {
      axios({
        url: URL.categorySubList,
        method: "post",
        data: {
          categoryId: categoryId
        }
      }).then(response => {
        // console.log(response)
        let res = response.data;
        this.categorySub = res.message;
        this.categorySubId = this.categorySub[0].ID;
        this.active=0
       if(this.loading){
         this.onLoadMore();
       }
       
        
      });
    },
    // 点击小分类获取goodsList
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      this.goodsList = [];
      this.finished = false;
      this.loading = true;
      this.page = 1;
      if(this.loading){
          this.onLoadMore();
      }
      
      
    },
    // 根据小类别id获取数据
    getGoodsList() {
      axios({
        url: URL.getCategorySubData,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      }).then(response => {
        let res = response.data;
          
       
        if(res.code == 200 && res.message.length>0){

            this.goodsList = this.goodsList.concat(res.message);
            this.page++;
            // console.log( this.goodsList);
            // console.log( this.page);
           
      
        } else {
          this.finished = true;
          //  this.isLoading = true;
        } 
         this.loading= false;
       
          
       
      });
    },
    onLoadMore() {
       
      setTimeout(() => {
       
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodsList();
      }, 500);
    },
    onRefresh(){
       setTimeout(() => {
      
        this.isLoading = false;
        this.finished = false;
        this.goodsList=[]
        this.page=1
        this.onLoadMore()
       
      }, 500);
    },
    goDetail(id){
      // 
      this.scroll =  document.getElementById("list-div").scrollTop;
        console.log(this.scroll)
        this.$router.push({name:'goods',params:{goodsId:id}})
    }
    

  },
   beforeRouteLeave(to,from,next){
   
    from.meta.scrollTop = this.scroll
    next()
  }
};
</script>

<style  scoped>
#categoryNav {
  background-color: aliceblue;
}
#categoryNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 16px;
  text-align: center;
}
.categoryActice {
  background-color: #ddd;
}
#list-div {
  overflow: scroll;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 16px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
    height: 4.5rem;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>