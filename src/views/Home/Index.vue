<!-- Index -->
<template>
  <div class="w1200">
    <div class="temp-x">
      <el-menu
        :default-active="$store.state.defpath"
        class="el-menu-demo"
        mode="horizontal"
        select="handleSelect"
        id="type-tab"
        :style="`width:${maxW}px`"
        router
      >
        <el-menu-item
          v-for="item in typeList"
          :key="item"
          :index="'/type/' + item"
          @click="TempX($event)"
          >{{ item }}</el-menu-item
        >
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getTypeOne } from "@/api";
export default {
  name: "Index",
  data() {
    return {
      typeList: [],
      maxW: Number,
    };
  },
  methods: {
    TempX(e) {
      console.log(e);
    },
  },
  created() {
    getTypeOne().then((res) => {
      this.typeList = res;
      this.maxW = 100 * this.typeList.length;
    });
  },
};
</script>

<style lang='scss'>
.temp-x {
  margin: 20px 0;
  width: 1200px;
  overflow: hidden;
}
#type-tab {
  border: 0;
  > .el-menu-item {
    color: rgb(51, 51, 51);
    height: 30px;
    line-height: 30px;
    border-radius: 50px;
    margin: 0 10px;
  }
  > .el-menu-item.is-active {
    border: 0;
    background: aquamarine;
  }
}
</style>