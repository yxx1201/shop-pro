<!-- Register -->
<template>
  <div class="w1200">
    <div class="reg-box">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="usname">
          <el-input
            type="text"
            v-model="ruleForm.usname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="uspswd">
          <el-input
            type="password"
            v-model="ruleForm.uspswd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import {Login} from '@/api';
export default {
  name: "Register",
  data() {
    var validateuser = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        usname: "",
        uspswd: "",
      },
      rules: {
        uspswd: [{ validator: validatePass, trigger: "blur" }],
        usname: [{ validator: validateuser, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         let usname = this.$refs[formName].model.usname;
          let uspswd = this.$refs[formName].model.uspswd;
          // console.log(usname, uspswd);
          Login({ userName: usname, password: uspswd }).then((res) => {
            if (res.code == 1) {
              this.$store.commit('Token',res.token)
              localStorage.setItem('token',res.token)
              this.$store.commit('ErrList',{text:'欢迎'+usname+' , '+'登录成功',color:'aqua'})
              this.$router.push("/home");
            }else{
              this.$store.commit('ErrList',{text:'登陆失败,用户名密码错误',color:'red'})
            }
          });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang='scss'>
.reg-box {
  width: 500px;
  margin: 0 auto;
  margin-top: 200px;
}
</style>