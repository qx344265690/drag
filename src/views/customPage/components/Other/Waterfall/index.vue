<template>
  <div
    :class="{ waterfall: true }"
    :style="{ border: classStyle }"
    @click="cahngeFather"
  >
    <p>商品瀑布流</p>
  </div>
</template>
<script>
import { Mixin } from "./../../mixin";
export default {
  name: "waterfall",
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
.waterfall {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  background: #b6b6b6;
  border: 3px solid #b6b6b6;
  border-radius: 10px;
  font-size: 20px;
  .saleActive {
    color: #2878ff;
  }
}
.activeClass {
  border: 3px dashed #6cb1f1;
}
</style>
