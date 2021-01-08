<template>
  <div
    :class="{ flashSale: true }"
    :style="{ border: classStyle }"
    @click="cahngeFather"
  >
    <div class="flashSale_head">
      <p>秒杀专区</p>
      <p class="more">更多 ></p>
    </div>
    <ul class="flashSale_title">
      <li
        v-for="item in titleList"
        :key="item.id"
        :class="{ saleActive: item.id == 0 }"
      >
        <p>{{ item.timer }}</p>
        <p :class="{ saleTitleActive: item.id == 0 }">{{ item.status }}</p>
      </li>
    </ul>
    <ul class="flashSale_content">
      <li v-for="item in contentList" :key="item.id">
        <img :src="item.img" alt="" />
        <p><span>￥</span>{{ item.price }}</p>
        <p>￥{{ item.originalPrice }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { Mixin } from "./../../mixin";
export default {
  name: "flashSale",
  mixins: [Mixin],
  data() {
    return {
      titleList: [
        { id: "0", timer: "08:00", status: "进行中" },
        { id: "1", timer: "10:00", status: "即将开始" },
        { id: "2", timer: "14:00", status: "即将开始" },
        { id: "3", timer: "20:00", status: "明日开始" },
        { id: "4", timer: "22:00", status: "11.22开始" }
      ],
      contentList: [
        {
          id: "0",
          img: require("@/assets/sonw.png"),
          price: "3559.00",
          originalPrice: "4500.00"
        },
        {
          id: "1",
          img: require("@/assets/sonw.png"),
          price: "3559.00",
          originalPrice: "4500.00"
        },
        {
          id: "2",
          img: require("@/assets/sonw.png"),
          price: "3559.00",
          originalPrice: "4500.00"
        },
        {
          id: "3",
          img: require("@/assets/sonw.png"),
          price: "3559.00",
          originalPrice: "4500.00"
        }
      ]
    };
  },
  props: {
    // 页面基础数据
    componentData: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
<style lang="less" scoped>
.flashSale {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 213px;
  background: #fff;
  border: 3px solid #fff;
  border-radius: 10px;
  font-size: 12px;
  p {
    margin: 0;
  }
  ul {
    margin: 0;
    li {
      list-style: none;
    }
  }
  .flashSale_head {
    width: 100%;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    p:nth-child(1) {
      font-size: 14px;
      font-weight: bold;
    }
    .more {
      color: #999;
    }
  }
  .flashSale_title {
    width: 100%;
    padding: 0 8px 12px 8px;
    display: flex;
    justify-content: space-between;
    li {
      font-weight: bold;
    }
  }
  .flashSale_content {
    width: 100%;
    display: flex;
    li {
      display: flex;
      flex-direction: column;
      margin: 0 5px;
      img {
        width: 100%;
        border: 1px solid #e6e6e6;
      }
      p:nth-child(2) {
        font-size: 14px;
        font-weight: bold;
        color: #ff2e2e;
        span {
          font-size: 12px;
        }
      }
      p:nth-child(3) {
        font-weight: bold;
        color: #999999;
        text-decoration: line-through;
      }
    }
  }
  .saleActive {
    color: #2878ff;
  }
  .saleTitleActive {
    background: #2878ff;
    border-radius: 10px;
    padding: 0 6px !important;
    color: #fff;
  }
}
.activeClass {
  border: 3px dashed #6cb1f1;
}
</style>
