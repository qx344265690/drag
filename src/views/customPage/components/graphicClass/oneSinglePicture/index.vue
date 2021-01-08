<template>
  <div :class="{ oneImg: true }" :style="{ border: classStyle }" @click="cahngeFather">
    <template v-if="oneSingImgList.length === 0 || oneSingImgList[0] === undefined || oneSingImgList[0].img.length == 0"
      >
      <img :src="oneBack" width="100%" height="100%" alt="">
    </template>
    <template v-else>
      <div v-for="(item, index) in oneSingImgList" :key="index">
        <img v-for="items in item.img" :key="items.name" :src="items.url" alt="" />
      </div>
    </template>
  </div>
</template>
<script>
import { Mixin } from './../../mixin'
export default {
  name: 'oneImg',
  mixins: [Mixin],
  data() {
    return {
      msg: '单列图片',
      oneSingImgList: [],
      isText: true,
      oneBack: require('@/assets/oneBack.png')
    }
  },
  props: {
    // 页面基础数据
    componentData: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    componentData: {
      handler: function (newVal) {
        this.oneSingImgList = newVal.bannerImg
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.oneImg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 370px;
  color: #fff;
  font-size: 24px;
  background: #ded8d8;
  overflow: hidden;
  margin: 5px 0 !important;
  p {
    margin: 0;
  }
  div {
    height: 370px;
    line-height: 370px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.activeClass {
  border: 3px dashed #6cb1f1;
}
</style>
