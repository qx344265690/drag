<template>
  <div
    :class="{ birdIntroduce: true }"
    :style="{ border: classStyle }"
    @click="cahngeFather"
  >
    <div class="birdIntroduceL">智慧家庭体验</div>
    <div class="birdIntroduceR">
      <div>专属管家</div>
      <div>VIP金牌服务</div>
    </div>
  </div>
</template>
<script>
import { Mixin } from "./../../mixin";
export default {
  name: "birdIntroduce",
  mixins: [Mixin],
  data() {
    return {
      msg: "介绍"
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
.birdIntroduce {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 127px;
  color: #fff;
  // background: #000;
  border: 3px solid #f0f2f5;
  border-radius: 3px;
  position: relative;
  .birdIntroduceL {
    background: #c0bbbb;
    border-radius: 7px;
    width: 169px;
    height: 122px;
    line-height: 122px;
  }
  .birdIntroduceR {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 122px;
    div {
      width: 169px;
      height: 60px;
      line-height: 60px;
      border-radius: 7px;
      background: #c0bbbb;
    }
  }
}
.activeClass {
  border: 3px dashed #6cb1f1;
}
</style>
