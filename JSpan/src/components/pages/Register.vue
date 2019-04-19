<template>
  <div>
   <van-nav-bar
      title="注册页"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
     
    />
    <div class="register-panel">

      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
        :error-message="usernameErrorMsg"
      />
   
    
      <van-field
        v-model="password"
        required
       
        label="密码"
        placeholder="请输入密码"
           clearable
          :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button size="large" type="info" @click="registerAction()" :loading="isLoad">
          注册
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import  axios from 'axios'
import URL from '@/assets/js/serverApi.js'
  export default {
    data(){
      return {
        username: '',
        password: '',
        isLoad: false, //是否开始加载
        usernameErrorMsg: '',
        passwordErrorMsg: '',
      }
    },
    methods: {
      onClickLeft() {
      this.$router.go(-1);
      },
      registerAction(){
        this.checkForm() && this.sendRegister()
      },
      sendRegister(){
        this.isLoad = true;
        axios({
          url:URL.registerUser,
          method: 'post',
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then((response)=>{
          let res = response.data;

          if(res.code ==200){
            this.$toast.success('注册成功')
            this.$router.push('/')
          }else{
            this.$toast.fail('注册失败')
            this.isLoad = false;
          }
        })
      },
      // 表单验证
      checkForm(){
        let isOk = true;

        if(this.username.length<5){
          this.usernameErrorMsg="用户名不能小于5";
          isOk = false;
        }else if(this.username.length>20){
            this.usernameErrorMsg="用户名不能大于20";
             isOk = false;
        }else{
          this.usernameErrorMsg="";
        }
        if(this.password.length<6){
          this.passwordErrorMsg = '密码不能少于6位'
           isOk = false;
        }else{
           this.passwordErrorMsg = "";
        }
        return  isOk
      }
      
    }
  }
</script>

<style  scoped>

</style>