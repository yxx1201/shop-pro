<!-- Rotation -->
<template>
  <div>
    <el-carousel indicator-position="outside" height="500px" id="rotation-box">
      <el-carousel-item v-for="item in src" :key="item">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>
    <Wares :lists="typeLists" uptype=0></Wares>
    <h1 class="load-text" v-show="!isload">加载中······</h1>
  </div>
</template>

<script>
import { getBanner, getGoods } from "@/api";
export default {
  name: "Rotation",
  data() {
    return {
      src: [],
      typeLists: [],
      i: 1,
      isload: true,
    };
  },
  created() {
    getBanner().then((val) => {
      this.src = val.data;
    });
    this.load();
  },
  methods: {
    load() {
      getGoods({ page: this.i }).then((res) => {
        this.typeLists = this.typeLists.concat(res);
      });
    },
    ScrollY() {
      let viewH =
        document.documentElement.clientHeight || document.body.clientHeight;
      let currentH =
        document.documentElement.scrollTop || document.body.scrollTop;
      let TotalH =
        document.documentElement.offsetHeight || document.body.offsetHeight;
      if (viewH + currentH >= TotalH - 300) {
        this.i = this.i + 1;
        if (this.isload == true) {
          this.isload = false;
          setTimeout(() => {
            this.load();
            this.isload = true;
          }, 2000);
        }else{
          return 0
        }
      }
    },
  },
  mounted() {
    window.onscroll = this.ScrollY;
  },
};
</script>

<style lang='scss'>
#rotation-box {
  border-radius: 20px;
}
.el-carousel__indicators {
  display: none;
}

.load-text{
    margin: 10px auto;
    color: aqua;
    font-size: 30px;
    text-align: center;
    transition: .5s;
  }
</style>