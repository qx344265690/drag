<template>
  <div
    :class="{ deposit: true }"
    :style="{ border: classStyle }"
    @click="cahngeFather"
  >
    <div class="deposit_head">
      <p>预售专区</p>
      <p class="more">更多 ></p>
    </div>
  </div>
</template>
<script>
import { Mixin } from "./../../mixin";
export default {
  name: "coupon",
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
.deposit {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 133px;
  background: #fff;
  border: 3px solid #fff;
  border-radius: 10px;
  font-size: 12px;
}
.activeClass {
  border: 3px dashed #6cb1f1;
}
</style>
