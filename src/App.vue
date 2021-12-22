<!-- App -->
<template>
  <div id="app">
    <div id="loading" v-if="isload">
      <img src="./assets/loading.jpg" />
    </div>
    <el-backtop></el-backtop>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isload: false,
    };
  },
  watch: {
    $route() {
      this.isload = true;
      setTimeout(()=>{
        this.isload=false
      },800)
    },
  },
};
</script>

<style lang='scss'>
@import url("assets/style/_base.scss");
@font-face {
  font-family: "iconfont"; /* Project id 2987208 */
  src: url("//at.alicdn.com/t/font_2987208_y098lf535c.woff2?t=1640143986150")
      format("woff2"),
    url("//at.alicdn.com/t/font_2987208_y098lf535c.woff?t=1640143986150")
      format("woff"),
    url("//at.alicdn.com/t/font_2987208_y098lf535c.ttf?t=1640143986150")
      format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 20px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
#loading {
  width: 99vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  background: #00000030;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
}
.el-backtop {
  transition: all 0.5s;
  &:hover {
    background: rgba(0, 242, 255, 0.5);
  }
}
</style>