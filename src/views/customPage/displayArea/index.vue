<template>
  <div class="displayArea" ref="areaBox">
    <div ref="boxs" class="disbox">
      <ShopSign
        @changeOperation="changeOperation"
        :classStyle="isBorderStyle === 88 ? activeClass : ''"
      />
      <!-- 展示选中框 -->
      <div class="componentPosition">
        <div class="componentBox">
          <component
            v-for="(item, index) in allComponents"
            :key="index"
            :is="item.componentName"
            :componentData="item"
            :childIndex="index"
            @valueUpdated="onUpdate($event, index)"
            :ref="item.componentName + index"
            :classStyle="isBorderStyle === index ? activeClass : ''"
          />
        </div>
      </div>
    </div>
    <div class="operationRelative">
      <Operation :operation="isBorderStyle" @subscript="changeSubscript" />
    </div>
    <div class="ToConfigure">
      <ToConfigure :operation="isBorderStyle" :itemDate="itemDate" />
    </div>
  </div>
</template>
<script>
import ShopSign from "../components/ShopSign/index";
import Operation from "../components/Operation/index";
import ToConfigure from "../components/ToConfigure/index";
import stationBox from "../components/StationBox/index"; // 用于站位
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
export default {
  name: "displayArea",
  data() {
    return {
      isActive: false,
      allComponents: [],
      isBorderStyle: null,
      itemDate: {}, // 暂存选中的值
      activeClass: "3px dashed #0066ff"
    };
  },
  components: {
    draggable,
    ShopSign,
    Operation,
    stationBox,
    ToConfigure,
    // 图文类
    banner: () => import("../components/graphicClass/banner/index"), //轮播
    oneImg: () => import("../components/graphicClass/oneSinglePicture/index"), //1列图片
    twoImg: () => import("../components/graphicClass/twoSinglePicture/index"), //2列图片
    threeImg: () =>
      import("../components/graphicClass/threeSinglePicture/index"), //3列图片
    // 促销类
    coupon: () => import("../components/PromotionClass/Coupon/index"), //优惠券
    pickShop: () => import("../components/PromotionClass/PickShop/index"), //推荐商品
    flashSale: () => import("../components/PromotionClass/FlashSale/index"), //限时抢购 - 秒杀专区
    deposit: () => import("../components/PromotionClass/Deposit/index"), //定价尾款 - 预售专区
    // 模块3
    vrPreview: () => import("../components/Bird/VrPreview/index"), //图片和文字
    birdIntroduce: () => import("../components/Bird/BirdIntroduce/index"), //介绍
    birdOrder: () => import("../components/Bird/BirdOrder/index"), //订单提报
    userCare: () => import("../components/Bird/UserCare/index"), //用户案例
    // 其他
    scene: () => import("../components/Other/Scene/index"), //场景
    ecology: () => import("../components/Other/Ecology/index"), //可配置1
    waterfall: () => import("../components/Other/Waterfall/index") //商品瀑布流
  },
  computed: {
    ...mapGetters(["customDashed", "allComponet", "allComponetIndex"])
  },
  watch: {
    /**
     * 监听vuex中数组，更改操作按钮是否展示
     */
    allComponet: {
      handler: function(newVal) {
        if (newVal === null) {
          return;
        }
        this.allComponents = newVal;
        if (newVal.length === 0) {
          this.isBorderStyle = null;
        }
      },
      immediate: true,
      deep: true
    },
    /**
     * 监听vuex中点击组件的下标，更新组件的高度
     */
    allComponetIndex: {
      handler: function(newVal) {
        if (newVal !== null) {
          this.$nextTick(() => {
            this.changeItemTop(this.itemDate, newVal);
          });
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    /**
     * 获取displayArea元素的宽度 + padding24*2 - 375为显示区域宽度
     * 整体除以2位一半的距离
     * 加400为左侧固定宽度
     * 放在定时器中执行，是因为有个100px的元素会算在最终结果，误差100
     */
    let time = null;
    clearTimeout(time);
    time = setTimeout(() => {
      let boxsLeft = (this.$refs.areaBox.offsetWidth + 48 - 375) / 2 + 400;
      this.$store.dispatch("changeCutomBox", boxsLeft);
      clearTimeout(time);
    }, 0);
  },
  methods: {
    /**
     * @describe 子组件调用点击元素的高度，更改mixins中的方法，调用是否显示选中
     * @param {e} 参数为item对象
     * @param {itemDeleteIndex} 修改后的下标
     */
    onUpdate(e, childIndex) {
      this.itemDate = e;
      this.changeItemTop(e, childIndex);
      this.isBorderStyle =
        this.isBorderStyle === childIndex ? null : childIndex;
      // 调用mixins中的方法changeActive(暂时没用上)
      // this.$refs[e.componentName][0].changeActive();
    },
    /**
     * @describe 修改展示区组件的top值(包含上下移动)
     * @param {e} 参数为item对象
     * @param {itemDeleteIndex} 修改后的下标
     * itemDeleteIndex 88 为店招
     * getBoundingClientRect 获取某个元素相对于视窗的位置集合
     */
    changeItemTop(e, itemDeleteIndex) {
      if (itemDeleteIndex === 88) {
        this.$store.dispatch("changeEachComponetH", 0);
        return false;
      }
      let itemRefs = this.$refs[
        this.allComponents[itemDeleteIndex].componentName + itemDeleteIndex
      ];
      if (itemRefs === undefined) {
        return false;
      }
      let rectObject = itemRefs[0].$el;
      this.$store.dispatch(
        "changeEachComponetH",
        rectObject.offsetTop + 90 + 76 + 124
      );
    },
    /**
     * @describe 获取修改后的下标
     * 用于是否哪个组件展示虚框样式
     */
    changeSubscript(ind) {
      this.isBorderStyle = ind;
    },
    /**
     * @describe 获取修改后的下标
     * 用于是否哪个组件展示虚框样式
     */
    changeOperation(shopIndex) {
      this.isBorderStyle = shopIndex;
      this.itemDate = {
        componentName: "店招",
        title: "店招"
      };
    }
  }
};
</script>
<style lang="less" scoped>
.displayArea {
  width: 100%;
  // height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .disbox {
    width: 375px;
    min-width: 375px;
    border: 2px dashed #c0bcbc;
    overflow: hidden;
    // background: #fff;
    cursor: pointer;
    .componentPosition {
      position: relative;
      min-height: 300px;
    }
    .componentBox {
      min-height: 400px;
      width: 100%;
      padding: 0 12px;
      // margin-bottom: 30px;
      position: inherit;
      top: -36px;
      // height: 500px;
      // overflow: auto;
      div {
        margin: 5px 0;
      }
    }
  }
  .operationRelative {
    position: relative;
    width: 70px;
    min-width: 70px;
  }
  .toConfigureRelative {
    position: relative;
    width: 375px;
    min-width: 375px;
  }
}
.ToConfigure {
  width: 375px;
}
.activeClass {
  border: 3px dashed #6cb1f1;
}
div::-webkit-scrollbar {
  width: 4px;
  height: 10px;
  /**/
}
div::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
div::-webkit-scrollbar-thumb {
  background: #bfc3b8;
  border-radius: 10px;
}
div::-webkit-scrollbar-thumb:hover {
  background: #333;
}
div::-webkit-scrollbar-corner {
  background: #179a16;
}
</style>
