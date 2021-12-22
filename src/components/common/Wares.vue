<!-- Wares -->
<template>
  <div>
    <el-row :gutter="20" class="w1200">
      <template v-for="item in lists">
        <el-col
          :span="4"
          v-if="item.type_two == uptype || uptype == 0"
          :key="item.Id"
        >
          <div class="grid-content bg-purple">
            <router-link
              :to="'/productdetails?id=' + item.Id"
              class="grid-content bg-purple"
            >
              <div class="img-box">
                <el-image :src="item.imageUrl" lazy fit="fill"></el-image>
                <!-- <img :src="../../assets/placeholder.gif" /> -->
              </div>
              <p class="text-title">{{ item.title }}</p>
              <div class="price-details">
                <p class="price">￥{{ item.priceStr }}</p>
                <p class="details" v-html="item.mack"></p></div
            ></router-link>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Wares",
  props: ["lists", "uptype"],
};
</script>

<style lang='scss'>
.title-slot {
  width: 100%;
}
.el-row {
  margin: 40px auto;
  &:last-child {
    margin-bottom: 0;
  }
  a.bg-purple.grid-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-end;
    border: 1px solid #ddd;
    min-height: 300px;
    cursor: pointer;
    .text-title {
      font-weight: bold;
    }
    .price-details {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 0;
      .price {
        color: red;
        font-weight: bold;
      }
      .details {
        font-size: 14px;
        line-height: 30px;
        span {
          padding: 0 5px;
        }
      }
    }
  }
  .el-col {
    border-radius: 4px;
    margin: 10px 20px;
    .img-box {
      width: 100%;
      min-height: 182px;
      img {
        width: 100%;
      }
    }
  }
}
</style>