<template>
  <!-- <div v-if="customDashed" :class="{ stationBox: true, active: customDashed }"></div> -->
  <div v-if="customDashed" :class="{ stationBox: true, active: customDashed }">
    <div>组件放置区域</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "stationBox",
  data() {
    return {
      msg: "占位使用"
    };
  },
  computed: {
    ...mapGetters(["customDashed"])
  }
};
</script>
<style lang="less" scoped>
.active {
  // width: 347px;
  // height: 150px;
  border: 3px dashed #6294e9;
  // border-radius: 10px;
  // margin: 200px auto;
  width: 346px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 1px !important;
  background: linear-gradient(
    45deg,
    rgba(102, 144, 246, 0.5) 0,
    rgba(102, 144, 246, 0.5) 25%,
    transparent 25%,
    transparent 50%,
    rgba(102, 144, 246, 0.5) 50%,
    rgba(102, 144, 246, 0.5) 75%,
    transparent 75%,
    transparent
  );
  background-size: 15px 15px;
  opacity: 0.6;
  div {
    width: 170px;
    background: #4277f6;
    color: #fff;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
}
</style>
