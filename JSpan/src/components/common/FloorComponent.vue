<template>
  <div>
    <div class="floor">
      <div class="floor-title">{{ floorTitle}}</div>
      <div class="floor-different">
        <div class="floor-one">
            <img :src="floorData0.photoUnify" alt="" width="90%">
        </div>
        <div>
           <div class="floor-two">
              <img :src="floorData1.photoUnify" alt="" width="90%">
           </div>
            <div >
              <img :src="floorData2.photoUnify" alt="" width="90%">
            </div>
            
        </div>
      </div>
      <div class="floor-normal">
        <div v-for="(item,index) in floorData.slice(3) " :key="index">
          <img :src="item.photoUnify" width="90%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['floorData','floorTitle'],
    data(){
      return {
        floorData0:{},
        floorData1:{},
        floorData2:{},
      }
    },
    created(){
        this.floorData0 = this.floorData[0];
        this.floorData1 = this.floorData[1];
        this.floorData2 = this.floorData[2];
    },
    // watch:{
    //   floorData:function(val){
    //     console.log(val)
    //     this.floorData0 = this.floorData[0];
    //     this.floorData1 = this.floorData[1];
    //     this.floorData2 = this.floorData[2];
    //   }
    // }

  }
</script>

<style  scoped>
  .floor-title{
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: #e5017d;
    height: 2.2rem;
    line-height: 2.2rem;
  }
  .floor-different{
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ddd;
  }

  .floor-different div{
    width: 10rem;
    box-sizing: border-box;
    text-align: center;

  }
  .floor-one{
    border-right: 1px solid #ddd;
  }
  .floor-two{
     border-bottom: 1px solid #ddd;
  }
  .floor-normal{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

     /* align-items:center; */
   

  }
  .floor-normal div{
    width: 10rem;
    box-sizing: border-box;
    text-align: center;
     border-bottom: 1px solid #ddd;
     text-align: center;
     /* height: 8rem; */

     


  }
  /* .floor-normal div img{
    height: 100%;
  } */
    .floor-normal div:nth-child(odd){
       border-right: 1px solid #ddd;
    }

</style>