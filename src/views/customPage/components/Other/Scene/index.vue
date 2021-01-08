<template>
  <div
    :class="{ scene: true }"
    :style="{ border: classStyle }"
    @click="cahngeFather"
  >
    <div class="userCare_head">
      <p>场景模块</p>
      <p class="more">更多 ></p>
    </div>
  </div>
</template>
<script>
import { Mixin } from "./../../mixin";
export default {
  name: "scene",
  mixins: [Mixin],
  data() {
    return {
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
.scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 347px;
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
        height: 86px;
        border: 1px solid #e6e6e6;
      }
      p:nth-child(2) {
        width: 160px;
        font-size: 12px;
        color: #333333;
        height: 37px;
        margin: 5px 0 !important;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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
