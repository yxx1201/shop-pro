<!-- ProductDetails -->
<template>
  <div class="detail-box">
    <div class="return-box">
      <button class="return" @click="Return()">
        <i class="iconfont">&#xeb15;</i><span>返回</span>
      </button>
    </div>
    <div style="width: 300px; height: 300px">
      <PicZoom :url="imgurl" scroll></PicZoom>
      <ul class="min-box">
        <li class="x-l" @click="TransF(1)">&lt;</li>
        <li style="min-width: 25px"></li>
        <li
          v-for="(item, index) in Detail.imgs"
          :key="index"
          @click="ImgUrlTab(index)"
          :style="'transform: translateX(' + transX + 'px)'"
        >
          <img :src="item" />
        </li>
        <li class="x-r" @click="TransF(0)">&gt;</li>
      </ul>
    </div>
    <div class="right-box">
      <h2 class="title">{{ Detail.title }}</h2>
      <p class="context">{{ Detail.supplier }}</p>
      <p class="price">￥{{ Detail.priceStr }}</p>
      <div class="ping">⭐⭐⭐⭐ 3.7</div>
      <button class="up-shop" @click="UpShop">添加到购物车</button>
    </div>
    <div style="width: 120%; margin: 0 -100px; padding: 100px 0">
      <Wares :lists="typeLists" uptype="0"></Wares>
    </div>
    <div class="footer-box" style="width: 120%; margin: 0 -100px">
      <img src="@/assets/footer.png" style="width: 100%" />
    </div>
  </div>
</template>

<script>
import { Detail, Add, SameList } from "@/api";
import PicZoom from "vue-piczoom";

export default {
  name: "ProductDetails",
  components: {
    PicZoom,
  },
  data() {
    return {
      Detail: {},
      imgurl: "",
      transX: 0,
      typeLists: [],
    };
  },
  watch: {
    $route() {
      this.DetailReq()
    },
  },
  methods: {
    Return() {
      history.back();
    },
    DetailReq() {
      Detail({ goodId: this.$route.query.id }).then((res) => {
        this.Detail = res[0];
        this.Detail.imgs = JSON.parse(this.Detail.imgs);
        this.Detail.imgs.splice(1, 1);
        this.imgurl = this.Detail.imgs[0];

        SameList({ supplier: res[0].supplier }).then((res) => {
          this.typeLists = res;
        });
      });
    },
    ImgUrlTab(e) {
      this.imgurl = this.Detail.imgs[e];
    },
    TransF(e) {
      if (e == 1 && this.transX < 0) {
        this.transX += 100;
      } else if (
        e == 0 &&
        this.transX >= (this.Detail.imgs.length - 4) * -100
      ) {
        this.transX -= 100;
      }
    },
    UpShop() {
      if (this.$store.state.islogin) {
        let token = this.$store.state.token;
        let goodId = this.Detail.Id;
        Add({ token, goodId }).then((res) => {
          if (res.code == 1) {
            this.$store.commit("ErrList", {
              text: "添加成功",
              color: "#00ffff",
            });
          } else {
            this.$store.commit("ErrList", {
              text: "添加失败请稍后重试···",
              color: "red",
            });
          }
        });
      } else {
        this.$store.commit("ErrList", {
          text: "请先进行登录再进行此操作",
          color: "red",
        });
      }
    },
  },
  created() {
    this.DetailReq()
  },
};
</script>

<style lang='scss'>
.detail-box {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  .return-box {
    width: 100%;
    margin-top: 10px;
    height: 40px;
    .return {
      width: 100px;
      height: 40px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        padding: 0 5px;
      }
    }
  }
  .min-box {
    width: 300px;
    height: 100px;
    display: flex;
    justify-content: left;
    align-items: center;
    overflow: hidden;
    position: relative;
    li {
      border: 1px solid #00ffff;
      min-width: 80px;
      height: 80px;
      margin: 0 3px;
      transition: all 0.5s;
      box-sizing: border-box;
      -moz-user-select: none; /*火狐*/
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*IE10*/
      -khtml-user-select: none; /*早期浏览器*/
      user-select: none;
      img {
        width: 100%;
        height: 100%;
      }
      &.x-l,
      &.x-r {
        margin: 0 0;
        min-width: 25px;
        width: 28px;
        line-height: 80px;
        text-align: center;
        font-size: 20px;
        color: #000;
        background: aqua;
        cursor: pointer;
        transition: all 0.5s;
      }
      &.x-l {
        position: absolute;
        left: 0;
        z-index: 99;
      }
      &.x-r {
        position: absolute;
        right: 0;
        z-index: 99;
      }
      &.x-l:hover,
      &.x-r:hover {
        background: blueviolet;
        color: #fff;
      }
    }
  }
  .right-box {
    width: 400px;
    height: 300px;
    display: flex;
    justify-content: left;
    align-items: flex-start;
    flex-wrap: wrap;
    .title {
      width: 100%;
    }
    .context {
      width: 100%;
      color: #854b00;
    }
    .price {
      width: 100%;
      color: rgb(255, 60, 0);
    }
    .ping {
      width: 100%;
    }
    .up-shop {
      width: 300px;
      height: 50px;
      border: 0;
      border-radius: 5px;
      background: #00ffff40;
      cursor: pointer;
    }
  }
}
</style>