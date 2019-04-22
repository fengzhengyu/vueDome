<template>
  <div>
    <div>
      <van-nav-bar
      title="分类页"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    </div>
    <div>
       
      <van-row>
        <van-col span="6" id="categoryNav">
          <ul>
            <li v-for="(item,index) in category" :key="index" :class="{ categoryActice:categpryIndex == index}" @click="clickCategory(index,item.ID)" >
              {{ item.MALL_CATEGORY_NAME }}
            </li>
          </ul>
        </van-col>
        <van-col span="18" id="categoryBody">
          <div class="tabCategorySub">
             <van-tabs v-model="active" >
              <van-tab :title="item.MALL_SUB_NAME" v-for="(item,index) in categorySub" :key="index"></van-tab>
             
            </van-tabs>
          </div>
          <div id="list-div">
            
          </div>
        </van-col>
    
      </van-row>
    </div>
  </div>
</template>

<script>

  import axios from "axios";
  import URL from  '@/assets/js/serverApi.js'
  export default {
    data(){
      return {
        category: [],
        categpryIndex: 0,
        active: 0,
        loading: false,
        categorySub: []
      }
    },
    
    created(){
      this.getCategroyList()
    },
    mounted(){
      let width = document.documentElement.clientHeight || document.body.clientHeight;
      document.getElementById('categoryNav').style.height = width-46 +'px';
    },
    
     methods: {
        onClickLeft() {
          this.$router.go(-1);
        },
        onClickRight() {
         this.$toast('按钮');
        },
        // 获取大分类
        getCategroyList(){
          axios({
            url: URL.categoryList,
            method: 'get',
          })
          .then(response=>{
         
            let res = response.data;
            if(res.code == 200 ){
              this.category = res.message;

              this.getCategorySubList(this.category[0].ID)
            }
            //  console.log(res)
          })
        },
        // 点击大分类
        clickCategory(index,categoryId){
          this.categpryIndex = index;
          this.active = 0;
          this.getCategorySubList(categoryId)

        },
        // 获取小分类
        getCategorySubList(categoryId){
          axios({
            url: URL.categorySubList,
            method: 'post',
            data: {
              categoryId: categoryId
            }
          }).then(response=>{
            // console.log(response)
            let res = response.data;
            this.categorySub = res.message;
          })
        },
        // 根据类别获取数据
        getCategorySubData(){
          
        }
      }
  }
</script>

<style  scoped>
    #categoryNav{
        background-color: aliceblue;
    }
    #categoryNav ul li {
        line-height: 2rem;
        border-bottom: 1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;
    }
    .categoryActice{
        background-color: #ddd;
    }

</style>