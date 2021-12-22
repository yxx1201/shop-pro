<!-- ShoppingCart -->
<template>
  <section>
    <div class="w1200">
      <div class="shop-box">
        <div class="err-box" v-if="shopList.errTitle">
          {{ shopList.errTitle }}
          <router-link to="/type/个护"><button>去逛逛</button></router-link>
        </div>
        <ul class="shop-list">
          <li class="shop-item" v-for="(item, index) in shopList" :key="index">
            <p class="shop-title">{{ item.addressName }}</p>
            <div class="shop-cont">
              <div class="check-box">
                <el-checkbox
                  v-model="item.ckall"
                  @change="Check(item)"
                ></el-checkbox>
              </div>
              <div class="shop-img">
                <router-link :to="'/productdetails?id=' + item.Id"
                  ><img :src="item.imageUrl"
                /></router-link>
              </div>
              <div class="shop-text">
                <router-link :to="'/productdetails?id=' + item.Id">
                  <p class="shop-text-title">{{ item.title }}</p>
                  <p class="shop-text-point">{{ item.salePoint }}</p>
                  <p class="shop-text-size" v-if="item.sizeList">
                    商品参数: {{ item.sizeList }}
                  </p>
                </router-link>
              </div>
              <div class="Price">￥{{ item.priceStr }}</div>
              <div class="quantity-box">
                <button class="num-down" @click="ReqNum(item, -1)">-</button>
                <input type="text" class="num-quan" v-model="item.count" />
                <button class="num-up" @click="ReqNum(item, 1)">+</button>
                <button class="del" @click="ReqNum(item, 0)">
                  <i class="iconfont">&#xe810;</i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="max-box">
      <div class="shop-box">
        <el-checkbox @change="CheckAll(ckalls)" v-model="ckalls"
          >全选</el-checkbox
        >
        <div class="sum-box">
          <span class="sum-num">￥{{ SumNum }}</span>
          <button class="submit-num">结算</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ShopList, Add, Remove, Delete } from "@/api";
export default {
  name: "ShoppingCart",
  data() {
    return {
      shopList: [],
      token: "",
      num: Number,
      isSet: true,
      ckalls: false,
      SumNum: 0,
    };
  },
  methods: {
    SetSumNum() {
      this.SumNum = 0;
      this.shopList.forEach((item) => {
        if (item.ckall == true) {
          this.SumNum += item.priceStr * item.count;
        } else {
          this.SumNum += 0;
        }
      });
    },
    Check(val) {
      let isTrue = 0;
      this.shopList.forEach((item) => {
        if (item.Id == val.Id) {
          if (item.ckall == false) {
            item.ckall = false;
            this.SumNum -= item.priceStr * item.count;
          } else {
            item.ckall = true;
            this.SumNum += item.priceStr * item.count;
          }
        }
        if (item.ckall == true) {
          isTrue++;
          if (isTrue == this.shopList.length) {
            this.ckalls = true;
          } else {
            this.ckalls = false;
          }
        }
      });
    },
    CheckAll(val) {
      this.ckalls = val;
      this.shopList.forEach((item) => {
        item.ckall = this.ckalls;
        if (this.ckalls == true) {
          this.SumNum += item.priceStr * item.count;
        } else {
          this.SumNum = 0;
        }
      });
    },
    GetShopList() {
      this.token = this.$store.state.token;
      ShopList({ token: this.token }).then((res) => {
        if (res.length == 0) {
          res.errTitle = "购物车空空如也";
        }
        this.shopList = res;
        this.shopList.forEach((item) => {
          item.ckall = false;
          item.sizeList = JSON.parse(item.sizeList)[0];
        });
      });
    },
    ReqNum(the, num) {
      if (this.isSet) {
        this.isSet = false;
        if (num == 1) {
          Add({ token: this.token, goodId: the.Id }).then((res) => {
            if (res.code == 1) {
              the.count++;
              this.SetSumNum();
              this.$store.commit("ErrList", {
                text: "数量修改成功",
                color: "aqua",
              });
            }
          });
        } else if (num == -1 && the.count != 1) {
          Remove({ token: this.token, goodId: the.Id }).then((res) => {
            if (res.code == 1) {
              the.count--;
              this.SetSumNum();
              this.$store.commit("ErrList", {
                text: "数量修改成功",
                color: "aqua",
              });
            }
          });
        } else if (num == 0) {
          Delete({ token: this.token, goodId: the.Id }).then((res) => {
            if (res.code == 1) {
              this.$store.commit("ErrList", {
                text: "删除成功",
                color: "aqua",
              });
              this.GetShopList();
              this.shopList.forEach((item) => {
                item.ckall = false;
              });
              this.ckalls = false;
              this.SumNum = 0;
            }
          });
        } else {
          this.$store.commit("ErrList", {
            text: "操作失败,条件无效",
            color: "red",
          });
        }
        setTimeout(() => {
          this.isSet = true;
        }, 200);
      }
    },
  },
  created() {
    this.GetShopList();
  },
};
</script>

<style lang='scss'>
.shop-box {
  width: 1000px;
  margin: 0 auto;
  border: 1px solid #ddd;
  margin-bottom: 100px;
  .el-checkbox__inner {
    border: 1px solid #000;
  }
  .shop-list {
    width: 100%;
    .shop-item {
      box-sizing: border-box;
      padding: 10px 50px;
      margin: 20px;
      display: flex;
      align-content: space-around;
      justify-content: space-between;
      flex-wrap: wrap;
      .shop-title {
        width: 100%;
        font-size: 18px;
        padding: 10px 0;
        font-weight: bold;
      }
      .shop-cont {
        width: 100%;
        padding: 20px 20px;
        border: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .shop-img {
          width: 100px;
          img {
            width: 100%;
          }
        }
        .shop-text {
          width: 300px;
          p {
            font-size: 14px;
            padding: 5px 2em;
            color: #333;
          }
          .shop-text-title {
            color: red;
            padding: 5px 0;
          }
        }
        .Price {
          color: red;
          font-size: 20px;
          text-align: right;
        }
        .quantity-box {
          text-align: right;
          button,
          input {
            width: 25px;
            height: 25px;
            border: 0;
            margin: 0 10px;
            outline: none;
            text-align: center;
            vertical-align: middle;
          }
          .num-quan {
            border: 1px solid pink;
          }
          .num-down,
          .num-up {
            font-size: 25px;
            font-weight: bold;
            line-height: 20px;
            cursor: pointer;
            transition: all 0.5s;
            background: #333;
            color: #fff;
            border-radius: 50%;
            &:hover {
              background: hotpink;
              color: #000;
            }
          }
          .del {
            margin-left: 20px;
            width: 40px;
            height: 40px;
            background: rgb(255, 124, 124);
            border-radius: 50%;
            cursor: pointer;
          }
        }
      }
    }
  }
  .err-box {
    width: 300px;
    height: 300px;
    text-align: center;
    line-height: 300px;
    color: red;
    button {
      padding: 3px 5px;
      border-radius: 5px;
      font-size: 12px;
      margin: 0 10px;
      cursor: pointer;
      border: 1px solid springgreen;
      background: #eee;
      transition: 0.5s all;
      color: #000;
      &:hover {
        background: pink;
      }
    }
  }
}
.max-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .shop-box {
    height: 100px;
    border: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .sum-box {
      display: flex;
      align-items: center;
      span {
        font-size: 30px;
        padding-right: 20px;
        color: red;
      }
      .submit-num {
        width: 80px;
        height: 40px;
        border: 1px solid #666;
        border-radius: 10px;
        margin: 0 70px;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        background: rgba(255, 0, 0, 0.707);
      }
    }
  }
  height: 100px;
  background: rgba(255, 166, 0, 0.619);
}
</style>