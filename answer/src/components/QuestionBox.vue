<template>
  <div class="question-box-containar">
    <b-jumbotron>
      <template slot="lead">{{ currentQuestion.question }}</template>

      <hr class="my-4">

      <b-list-group >
        <b-list-group-item 
          v-for="(answer,index) in answers"
          :key="index"
          @click.prevent="selectAnswer(index)"
          :class="[
          !answered && selectIndex === index ?'selected': 
          answered&&correctIndex === index? 'correct':
          answered&& selectIndex === index && correctIndex !== index? 'incorrect':''
          ]"
        >
          {{ answer }}
        </b-list-group-item>
      
      </b-list-group>

      <b-button variant="primary" href="#"
        @click="submitAnswer"
        :disabled="selectIndex == null || answered"
      >Submit</b-button>
      <b-button variant="success" href="#" @click="next">Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    currentQuestion: Object,
    next: Function,
    increment: Function
  },
  data() {
    return {
      selectIndex: null, //点击索引
      correctIndex: null, //正确的索引
      shuffledAnswers:[], //搅乱的数据
      answered: false
    };
  },
  watch: {
    // 当值改变时才触发
    // currentQuestion(){
    //   this.selectIndex = null
    //   this.shuffleAnswers()  //切换问题。从新洗牌
    // }
    currentQuestion: { //子组件props首次获取到父组件传来的默认值时，也需要执行函数，此时就需要将immediate设为true。
      immediate: true,
      handler() {
         this.selectIndex = null
          this.answered = false
         this.shuffleAnswers()
      }
    }
  },
  computed:{
    answers(){
      let answers = [...this.currentQuestion.incorrect_answers]
      answers.push(this.currentQuestion.correct_answer)
      return answers
    }
  },
  methods: {
    // 
    selectAnswer(index){
      this.selectIndex = index
    },
    shuffleAnswers(){
      let answers = [...this.currentQuestion.incorrect_answers,this.currentQuestion.correct_answer];
      this.shuffledAnswers = _.shuffle(answers);
      this.correctIndex =  this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
      console.log(this.correctIndex)
       console.log(this.shuffledAnswers )
    },
    submitAnswer(){
      let isCorrect = false;
      if(this.selectIndex == this.correctIndex){
        isCorrect = true
      }
      this.answered = true
      this.increment(isCorrect)
    }
  }
};
</script>

<style scoped>
.list-group{
  margin-bottom: 25px;
}
.list-group-item:hover{
  background-color: #eee;
  cursor:pointer;
}
.selected{
  background-color: lightblue;
}
.correct{
   background-color: lightgreen;
}
.incorrect{
   background-color: red;
}
</style>
