<!-- Header -->
<template>
  <div class="header-box" :style="`height:${Height}px`">
    <ul class="err-box">
      <li
        v-for="(item, i) in $store.state.errList"
        :style="{ color: item.color }"
        :key="i"
      >
        {{ item.text }}
      </li>
    </ul>
    <header
      class="header w1200"
      :style="isT == false ? 'display:flex;' : 'display:none;'"
    >
      <div class="logo-box" v-show="true">
        <img src="@/assets/logo.png" width="100%" />
      </div>
      <div class="search-box">
        <input
          type="text"
          class="input_inner"
          v-model="text"
          @keyup.enter="Search"
          placeholder="请输入要搜索的商品"
        />
        <span class="search-btn" @click="Search">
          <i class="iconfont">&#xe601;</i>
        </span>
      </div>
    </header>
    <div
      class="sct-box"
      :style="isT == false ? 'margin:-5px auto;' : 'padding-top:10px;'"
    >
      <el-menu
        :default-active="$store.state.defpath"
        class="el-menu-demo"
        mode="horizontal"
        id="title-tab-box"
        router
      >
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/login" v-show="$store.state.islogin == false"
          >登录</el-menu-item
        >
        <el-menu-item index="/register" v-show="$store.state.islogin == false"
          >注册</el-menu-item
        >
        <el-menu-item index="/shoppingcart" v-show="$store.state.islogin == true"
          >购物车</el-menu-item
        >
        <el-menu-item index="/" v-show="$store.state.islogin == true" @click="QuitLogin"
          >退出登录</el-menu-item
        >
      </el-menu>
      <div class="search-box" v-show="isT">
        <input
          type="text"
          class="input_inner"
          v-model="text"
          @keyup.enter="Search"
          placeholder="请输入要搜索的商品"
        />
        <span class="search-btn" @click="Search">
          <i class="iconfont">&#xe601;</i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      fit: "scale-down",
      url: "",
      text: "",
    };
  },
  props:["isT","Height"]
  ,
  methods: {
    Search() {
      if (this.text == "") {
        this.$store.commit("ErrList", { text: "搜索内容不能为空", color: "red" });
        return 0;
      }
      this.$router.push("/search?key=" + this.text);
    },
    QuitLogin() {
      localStorage.removeItem("token");
      this.$store.commit("Token", null);
    },
   
  },
};
</script>

<style lang="scss">
.err-box {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  z-index: 99999;
  li {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 10px;
    border-radius: 50px;
    font-size: 14px;
    transform: translateY(10px);
    background: #fff;
    transition: all 0.5s;
    box-shadow: 0 0 10px 0 hotpink;
  }
}
.sct-box {
  display: flex;
  width: 1200px;
  margin: -5px auto;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  z-index: 99999;
}
.header-box {
  position: sticky;
  top: 0;
  width: 100%;
  max-height: 160px;
  min-height: 60px;
  box-shadow: 0 0 8px 2px #00000060;
  background: #fff;
  z-index: 999;
  transition: all 0.1s ease;
  .header {
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo-box {
      width: 200px;
    }
  }
  #title-tab-box {
    height: 40px;
    box-sizing: border-box;
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      color: rgb(51, 51, 51);
      font-weight: bold;
      transition: 0.5s all;
    }
  }
  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 9999;
    .input_inner {
      outline: none;
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      width: calc(100% - 40px);
      font-size: 14px;
    }
    .search-btn {
      display: inline-block;
      width: 40px;
      height: 40px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      text-align: center;
      line-height: 40px;
      cursor: pointer;
    }
  }
}
</style>
