<template>
  <div
    :class="{ birdOrder: true }"
    :style="{ border: classStyle }"
    @click="cahngeFather"
  >
    <!-- <template v-if="isText">{{ msg }}</template>
    <template else> -->
    <!-- <div v-for="(item, index) in oneSingImgList" :key="index">
      <template v-if="item.img[0] === undefined">{{ msg }}</template>
      <template else>
        <img
          v-for="items in item.img"
          :key="items.name"
          :src="items.url"
          alt=""
        />
      </template>
    </div> -->
    <div v-for="(item, index) in oneSingImgList" :key="index">
      <img
        v-for="items in item.img"
        :key="items.name"
        :src="items.url"
        alt=""
      />
    </div>
    <!-- </template> -->
  </div>
</template>
<script>
import { Mixin } from "./../../mixin";
export default {
  name: "birdOrder",
  mixins: [Mixin],
  data() {
    return {
      msg: "預約保命",
      oneSingImgList: [],
      isText: true
    };
  },
  props: {
    // 页面基础数据
    componentData: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    componentData: {
      handler: function(newVal) {
        console.log(newVal.bannerImg);
        this.oneSingImgList = newVal.bannerImg;
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    // console.log(this.componentData);
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.birdOrder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 120px;
  color: #fff;
  font-size: 24px;
  background: #ded8d8;
  border-radius: 10px;
  border: 3px solid #ded8d8;
  overflow: hidden;
  p {
    margin: 0;
  }
  div {
    height: 106px;
    line-height: 106px;
    img {
      width: 100%;
      height: 103px;
    }
  }
}
.activeClass {
  border: 3px dashed #6cb1f1;
}
</style>
