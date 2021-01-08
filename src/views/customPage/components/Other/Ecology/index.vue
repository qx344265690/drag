<template>
  <div
    :class="{ ecology: true }"
    :style="{ border: classStyle }"
    @click="cahngeFather"
  >
    <div class="pickShop_head">
      <p>可配置1</p>
      <p class="more">更多 ></p>
    </div>
    <ul class="pickShop_content">
      <li v-for="item in contentList" :key="item.id">
        <img :src="item.img" alt="" />
        <p>{{ item.title }}</p>
        <p><span>￥</span>{{ item.price }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { Mixin } from "./../../mixin";
export default {
  name: "ecology",
  mixins: [Mixin],
  data() {
    return {
      contentList: [
        {
          id: "0",
          img: require("@/assets/sonw.png"),
          price: "3559.00",
          title: "xxxx"
        },
        {
          id: "1",
          img: require("@/assets/sonw.png"),
          price: "3559.00",
          title: "xxxx"
        },
        {
          id: "2",
          img: require("@/assets/sonw.png"),
          price: "3559.00",
          title: "xxxx"
        },
        {
          id: "3",
          img: require("@/assets/sonw.png"),
          price: "3559.00",
          title: "xxxx"
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
.ecology {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 205px;
  background: #fff;
  border: 3px solid #fff;
  border-radius: 10px;
  font-size: 12px;
  overflow: hidden;
  p {
    margin: 0;
  }
  ul {
    margin: 0;
    li {
      list-style: none;
    }
  }
  .pickShop_head {
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
  .pickShop_content {
    width: 100%;
    display: flex;
    li {
      display: flex;
      flex-direction: column;
      margin: 0 2px;
      img {
        width: 100%;
        border: 1px solid #e6e6e6;
      }
      p:nth-child(2) {
        font-size: 12px;
        font-weight: bold;
        text-align: left;
        width: 93px;
        height: 35.2px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
      }
      p:nth-child(3) {
        font-size: 14px;
        font-weight: bold;
        color: #ff2e2e;
        span {
          font-size: 12px;
        }
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
