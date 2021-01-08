<template>
  <div class="threeImg" :style="{ border: classStyle }" @click="cahngeFather">
    <div v-if="threeSinglePicture.length == 0">
      <ul>
        <li><img :src="threeLeft" width="100%" height="100%" alt=""></li>
        <li><img :src="threeContent" width="100%" height="100%" alt=""></li>
        <li><img :src="threeLeft" width="100%" height="100%" alt=""></li>
      </ul>
    </div>
    <ul v-else>
      <li v-for="(item, index) in threeSinglePicture" :key="index">
        <template
          v-if="threeSinglePicture.length === 0 || threeSinglePicture[index] === undefined || threeSinglePicture[index].img.length == 0"
          ><img :src="index === 1 ? threeContent : threeLeft" width="100%" height="100%" alt="">
        </template>
        <template v-else>
          <img v-for="items in item.img" :key="items.name" :src="items.url" alt="" />
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
import { Mixin } from './../../mixin'
export default {
  name: 'threeImg',
  mixins: [Mixin],
  data() {
    return {
      msg: '三列图片',
      threeSinglePicture: [],
      threeLeft: require('@/assets/threeLeft.png'),
      threeContent: require('@/assets/threeContent.png')
    }
  },
  props: {
    componentData: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    componentData: {
      handler: function (newVal) {
        this.threeSinglePicture = newVal.bannerImg
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
.threeImg {
  color: #fff;
  background: #ded8d8;
  height: 160px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin: 5px 0 !important;
  ul {
    display: flex;
    justify-content: space-between;
    margin: 0;
    li {
      width: 125px;
      height: 160px;
      font-size: 24px;
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
    // li:nth-child(2) {
    //   margin: 0 2px;
    //   padding: 0 2px;
    //   border-left: 1px solid #fff;
    //   border-right: 1px solid #fff;
    // }
  }
}
</style>
