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
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >注册</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Register } from "@/api";

export default {
  name: "Register",
  data() {
    var patrn =
      /[`·~!@#$%^&*()_\-+=<>?:"{}|,./;'[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’'，。、]/gim;

    var validateuser = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        if (/\s+/g.test(value) || patrn.test(value)) {
          callback(new Error("用户名不能包含空格等特殊字符"));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (/\s+/g.test(value) || patrn.test(value)) {
          callback(new Error("输入错误,不能包含空格等特殊字符"));
        } else {
          if (value.length < 6) {
            callback(new Error("密码最少输入6位"));
          } else {
            if (this.ruleForm.checkPass !== "") {
              this.$refs.ruleForm.validateField("checkPass");
            }
            callback();
          }
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.uspswd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        usname: "",
        uspswd: "",
        checkPass: "",
      },
      rules: {
        uspswd: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
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
          console.log(usname, uspswd);
          Register({ userName: usname, password: uspswd }).then((res) => {
            if (res.code == 1) {
              this.$router.push("/login");
            }else{
              alert('注册失败,用户名已存在')
            }
          });
        } else {
          alert('注册失败')
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