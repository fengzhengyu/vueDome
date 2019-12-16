<template>
  <div>
    <el-form :model="ruleForm" ref="form">
      <el-form-item label="用户名" prop="username" :rules="rules">
        <el-input type="age" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: ""
      },
      rules: [{ required: true, trigger: "blur", message: "请输入用户名" }],
      flag: false
    };
  },
  beforeRouteEnter(to, from, next) {
    // ...进入路由做ajax 数据请求  拿不到this
    next(vm => {
      //这种方式拿this
      console.log(vm);
    });
  },
  beforeRouteLeave(to, from, next) {
    // ...
    if (!this.flag && this.ruleForm.username) {
      this.$confirm("是否提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          next();
        })
        .catch(() => {});
    }else{
      next();
    }
  },
  methods: {
    add() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.flag = true;
          let id = Math.random();
          let lists = JSON.parse(localStorage.getItem("lists")) || [];
          lists.push({
            id: id,
            name: this.ruleForm.username
          });
          localStorage.setItem("lists", JSON.stringify(lists));
          this.$router.push("/user/list");
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

