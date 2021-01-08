<template>
  <div :class="{ banner: true }" :style="{ border: classStyle }" @click="cahngeFather">
    <a-carousel autoplay>
      <template v-if="bannerList.length === 0">
        <div class="bannerTest">
          <img :src="bannerBack" height="100%" alt="">
        </div>
      </template>
      <template>
      <div v-for="(item, index) in bannerList" :key="index" class="bannerBack">
        <template v-if="bannerList.length === 0 || bannerList[index] === undefined || bannerList[index].img.length == 0"
            ><div class="bannerTest">
              <img :src="bannerBack" height="100%" alt="">
            </div>
          </template>
          <template v-else>
        <div v-for="items in item.img" :key="items.name">
          <img v-if="true" :src="items.url" alt="" />
        </div>
        </template>
      </div>
      </template>
    </a-carousel>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Mixin } from './../../mixin'
export default {
  name: 'banner',
  mixins: [Mixin],
  data() {
    return {
      msg: '轮播图',
      bannerList: [],
      allComponetBanIndexs: '0',
      bannerBack: require('@/assets/bannerBack.png')
    }
  },
  props: {
    componentData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters(['allComponet', 'allComponetIndex']),
  },
  watch: {
    /**
     * @describe 获取vuex-展示区域下标
     */
    allComponetIndex: {
      handler: function (newVal) {
        this.allComponetBanIndexs = newVal
      },
      deep: true,
    },
    componentData: {
      handler: function (newVal) {
        this.bannerList = newVal.bannerImg || []
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {},
  mounted() {
  },
}
</script>
<style lang="less" scoped>
.banner {
  height: 403px;
  background: #ded8d8;
  border: 3px solid #ded8d8;
  margin: 0 12px;
  .bannerTest {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 403px;
    font-size: 24px;
    color: #fff;
  }
}
.ant-carousel /deep/ .slick-slide {
  height: 403px;
  text-align: center;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    height: 396px;
  }
}

.ant-carousel /deep/ .slick-slide h3 {
  color: #fff;
}
.ant-carousel /deep/ .slick-dots li {
  background: #f10;
}
</style>
