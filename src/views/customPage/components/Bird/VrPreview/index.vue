<template>
  <div
    :class="{ vrPreview: true }"
    :style="{ border: classStyle }"
    @click="cahngeFather"
  >
    <div class="userCare_head">
      <p>图片和文字</p>
      <p class="more">更多 ></p>
    </div>
    <ul class="userCare_content">
      <li v-for="item in contentList" :key="item.id">
        <img :src="item.img" alt="" />
        <p>{{ item.text }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { Mixin } from "./../../mixin";
export default {
  name: "vrPreview",
  mixins: [Mixin],
  data() {
    return {
      contentList: [
        {
          id: "0",
          img: require("@/assets/sonw.png"),
          text: "玄关焕新升级版"
        },
        {
          id: "1",
          img: require("@/assets/sonw.png"),
          text: "玄关焕新升级版玄关焕新升级版"
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
.vrPreview {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 212px;
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
  .userCare_head {
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
  .userCare_title {
    width: 100%;
    padding: 0 8px 19px 8px;
    display: flex;
    justify-content: space-between;
    li {
      font-size: 13px;
    }
  }
  .userCare_content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      display: flex;
      flex-direction: column;
      margin: 0 5px;
      width: 160px;
      img {
        width: 100%;
        height: 104px;
        border: 1px solid #e6e6e6;
      }
      p:nth-child(2) {
        font-size: 12px;
        color: #333333;
        height: 37px;
        line-height: 37px;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
  .saleActive {
    color: #2878ff;
  }
  // .saleTitleActive {
  //   background: #2878ff;
  //   border-radius: 10px;
  //   padding: 0 6px !important;
  //   color: #fff;
  // }
}
.activeClass {
  border: 3px dashed #6cb1f1;
}
</style>
