<template>
  <div id="app">
    <Header
      :numCorrect="numCorrect"
      :numTotal="numTotal"
    />
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset="3">
          <QuestionBox 
            v-if="questions.length>0"
            :currentQuestion="questions[index]"
            :next="next"
            :increment= "increment"
          />
        </b-col>
        
      </b-row>
    </b-container>
    <Test></Test>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import QuestionBox from './components/QuestionBox.vue'
import Test from './components/Test.vue'
export default {
  name: 'App',
   components: {
     Header,
     QuestionBox,
     Test
  },
  data(){
    return {
      questions: [],
      index: 0,
      numCorrect: 0,
      numTotal: 0
    }
  },
  methods: {
     next(){
      if(this.index >= this.questions.length-1){
        return;
      }
      
      this.index++
  
    
    },
    increment(isCorrect){
      // 正确增加数量
      if(isCorrect){
        this.numCorrect++
      }
      // 反之 
      this.numTotal++
    }
  },
  created(){


    fetch('https://opentdb.com/api.php?amount=10&category=27&type=multiple', {
      method: 'get'
    })
    .then((response)=>{
     return response.json()
    })
    .then((response)=>{
      console.log(response)
      this.questions = response.results;
    })
  },
 
}
</script>

<style>
  #app{
    font-family:Arial, Helvetica, sans-serif;
    text-align: center;
    margin-top: 60px;
    color: #2c3e50;
  }
</style>
