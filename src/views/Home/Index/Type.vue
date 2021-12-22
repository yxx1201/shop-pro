<!-- Type -->
<template>
  <div class="box">
    <div v-for="item in type_two_title" :key="item">
      <h1 class="type-list-title" :id="item">
        {{ item }}
      </h1>
      <Wares :lists="typeLists" :uptype="item"></Wares>
    </div>
    <div id="go-target">
      <el-tabs tab-position="left" @tab-click="TagScoll" :value="menuId">
        <template v-for="(item, i) in type_two_title">
          <el-tab-pane :key="item" :label="item" :ref="i"></el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getGoods } from "@/api";
export default {
  name: "Type",
  data() {
    return {
      type: "",
      typeLists: [],
      type_two_title: [],
      menuId: "0",
      OfTops: [],
    };
  },
  watch: {
    $route(to, from) {
      to + from;
      this.typePro();
    },
  },
  methods: {
    TagScoll(tab) {
      document.getElementById(tab.label).scrollIntoView({ behavior: "smooth" });
    },
    TagScollG() {
      let scrollT =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.OfTops.forEach((item, i) => {
        if (
          scrollT > item - 230 ||
          (i == this.OfTops.length - 1 && scrollT > item - 250)
        ) {
          this.menuId = String(i);
        }
      });
    },
    typePro() {
      this.type_two_title = [];
      this.type = this.$route.params.type;
      getGoods({ type_one: this.type }).then((res) => {
        this.typeLists = res;
        res.forEach((i) => {
          this.type_two_title.push(i.type_two);
        });
        this.type_two_title = [...new Set(this.type_two_title)];
      });
    },
  },
  mounted() {
    window.onscroll = this.TagScollG;
    setTimeout(() => {
      this.type_two_title.forEach((item) => {
        this.OfTops.push(document.getElementById(item).offsetTop);
      });
    }, 1000);
  },
  created() {
    this.typePro();
  },
};
</script>

<style lang='scss'>
.type-list-title {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  background: rgba(0, 251, 255, 0.3);
  margin: 50px 0 80px 0;
}
.box {
  #go-target {
    position: fixed;
    top: 170px;
    left: 10px;
    background-color: transparent;
    .el-tabs__item.is-active {
      background: rgba(255, 0, 255, 0.544);
      color: rgb(0, 55, 255);
      font-weight: bold;
    }
    .el-tabs__item {
      transition: all 0.5s;
      border-radius: 50px;
      text-align: center;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      background: transparent;
      color: #000;
      &:hover {
        background-color: rgb(255, 48, 176, 0.2);
        box-shadow: 0 0 10px 1px hotpink;
        a {
          color: #000;
        }
      }
    }
  }
}
</style>