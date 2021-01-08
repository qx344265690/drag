<template>
  <div class="twoImg" :style="{ border: classStyle }" @click="cahngeFather">
    <div v-if="twoSinglePicture.length == 0">
      <ul>
        <li><img :src="oneBackLeft" width="100%" height="100%" alt=""></li>
        <li><img :src="oneBackRight" width="100%" height="100%" alt=""></li>
      </ul>
    </div>
    <ul v-else>
      <li v-for="(item, index) in twoSinglePicture" :key="index">
        <template v-if="twoSinglePicture.length === 0 || twoSinglePicture[index] === undefined || twoSinglePicture[index].img.length == 0"
          ><img :src="index === 0 ? oneBackLeft : oneBackRight" width="100%" height="100%" alt="">
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
  name: 'twoImg',
  mixins: [Mixin],
  data() {
    return {
      msg: '双列图片',
      twoSinglePicture: [],
      oneBackLeft: require('@/assets/oneBackLeft.png'),
      oneBackRight: require('@/assets/oneBackRight.png')
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
        this.twoSinglePicture = newVal.bannerImg
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
.twoImg {
  color: #fff;
  background: #ded8d8;
  height: 196px;
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
      width: 183px;
      height: 196px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      list-style: none;
      margin: 0;
      padding: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    // li:nth-child(2) {
    //   margin-left: 2px;
    //   padding-left: 3px;
    //   border-left: 1px solid #fff;
    // }
  }
}
</style>
