<template>
  <div class="modular">
    <div class="m_title">模块</div>
    <a-collapse v-model="activeKey" accordion>
      <a-collapse-panel
        v-for="item in modularList"
        :key="item.id"
        :header="item.title"
      >
        <ul>
          <li
            v-for="items in item.child"
            :key="items.id"
            class="drag"
            @mousedown="move($event, items)"
          >
            <img :src="items.iconImg" />
            <p>{{ items.title }}</p>
          </li>
        </ul>
      </a-collapse-panel>
    </a-collapse>
    <div class="moduleShadow shadow" ref="shadowRef">
      {{ chilidVal.title }}
      <!-- <img :src="chilidVal.iconImg" width="100%" alt="" /> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "modular",
  data() {
    return {
      activeKey: ["0", "1"],
      modularList: [
        {
          title: "图类",
          id: "0",
          child: [
            {
              title: "轮播",
              iconImg: require("@/assets/carousel.png"),
              componentName: "banner",
              bannerImg: [],
              id: 0
            },
            {
              title: "单列图片",
              iconImg: require("@/assets/i_single.png"),
              componentName: "oneImg",
              bannerImg: [],
              id: 1
            },
            {
              title: "双列图片",
              iconImg: require("@/assets/i_two.png"),
              componentName: "twoImg",
              bannerImg: [],
              id: 2
            },
            {
              title: "三列图片",
              iconImg: require("@/assets/i_three.png"),
              componentName: "threeImg",
              bannerImg: [],
              id: 3
            }
          ]
        },
        {
          title: "促销类",
          id: "1",
          child: [
            {
              title: "优惠券",
              iconImg: require("@/assets/sonw.png"),
              componentName: "coupon",
              id: 0
            },
            {
              title: "推荐商品",
              iconImg: require("@/assets/sonw.png"),
              componentName: "pickShop",
              pickShopTextList: [{ id: 0, sku: "", serialNumber: "" }],
              id: 1
            },
            {
              title: "限时抢购",
              iconImg: require("@/assets/sonw.png"),
              componentName: "flashSale",
              id: 2
            }
          ]
        },
        {
          title: "模块3",
          id: "2",
          child: [
            {
              title: "图片和文字",
              iconImg: require("@/assets/sonw.png"),
              componentName: "vrPreview",
              bannerImg: [],
              id: 0
            },
            {
              title: "用户案例",
              iconImg: require("@/assets/sonw.png"),
              componentName: "userCare",
              id: 1
            }
          ]
        },
        {
          title: "其他",
          id: "3",
          child: [
            {
              title: "场景",
              componentName: "scene",
              iconImg: require("@/assets/sonw.png"),
              id: 0
            },
            {
              title: "可配置1",
              iconImg: require("@/assets/sonw.png"),
              componentName: "ecology",
              pickShopTextList: [{ id: 0, sku: "", serialNumber: "" }],
              id: 1
            },
            {
              title: "商品瀑布流",
              iconImg: require("@/assets/sonw.png"),
              componentName: "waterfall",
              id: 2
            }
          ]
        }
      ],
      customDistanceToLefts: Number,
      componentParams: [], //用于存放组件数组
      chilidVal: {}, //点击li模块图片保存信息
      componentIndex: null, //用于距离左侧范围
      allComponetVuex: [], //vuex中的数据
      okIndex: null,
    };
  },
  computed: {
    ...mapGetters([
      "allComponet",
      "allComponetIndex",
      "isCustom",
      "customDistanceToLeft"
    ])
  },
  watch: {
    /**
     * @describe 是否是自定义 0首页 1自定义
     */
    isCustom: {
      handler: function(newVal) {
        this.isCustoms = newVal === "0";
      },
      immediate: true,
      deep: true
    },
    /**
     * @describe 展示区域 距离左侧距离
     */
    customDistanceToLeft: {
      handler: function(newVal) {
        this.customDistanceToLefts = newVal;
      },
      // immediate: true,
      deep: true
    },
    /**
     * @describe vuex中数据
     * allComponetVuex 保存vuex数据
     * componentParams 当前页面vuex数据
     */
    allComponet: {
      handler: function(newVal) {
        this.allComponetVuex = newVal;
        this.componentParams = newVal;
      },
      immediate: true,
      deep: true
    },
    /**
     * @describe 监听vuex中点击组件的下标
     */
    allComponetIndex: {
      handler: function(newVal) {
        this.componentIndex = newVal;
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.customDistanceToLefts = this.$store.state.custom.customDistanceToLeft;
  },
  methods: {
    end1(e) {
      var that = this;
      var items = this.arr2.filter(function(m) {
        return m.id == that.moveId;
      });
      //如果左边
      if (items.length < 2) return;
      this.arr2.splice(e.newDraggableIndex, 1);
    },
    move(e, itemVal) {
      this.chilidVal = itemVal;
      let odiv = e.target;
      // 算出鼠标点击，相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      let showLeftContent = Number;
      let allScroll = this.getChildElementScrollTop();
      // 拖拽虚影----重置并定位到按钮的中心位置
      let shadowDiv = this.$refs.shadowRef;
      shadowDiv.style.left =
        shadowDiv.offsetLeft -
        (shadowDiv.offsetWidth / 2 - odiv.offsetWidth / 2) +
        "px";
      shadowDiv.style.top =
        shadowDiv.offsetTop -
        (shadowDiv.offsetHeight / 2 - odiv.offsetHeight / 2) +
        "px";
      shadowDiv.style.zIndex = 1;
      /**
       * @describe 创建展示区阴影，声明在点击事件中，不用重复触发;
       * shadowDivLeft 控制移动阴影距离左侧的间距，不带px的，省着增加去除PX代码;
       * shadowDivtTop 暂时先没声明，后期用;
       * shoBoxContent 移动时，阴影的大小，在移动时动态增加;
       * stationdata 对象默认定义阴影
       */
      let shadowDivLeft = Number;
      let shadowDivtTop = Number;
      let shoBoxContent = 60;
      let stationdata = {
        componentName: "stationBox",
        isShowComp: false,
        id: 99
      };
      // 滚动高度
      let contetnScrollTop = Math.round(
        document.getElementsByClassName("contetnShadow")[1].scrollTop
      );
      // 在每个现有模块前面添加上阴影
      allScroll.forEach((item, index) => {
        if (item.id !== 99) {
          this.componentParams.splice(
            index + index,
            0,
            JSON.parse(JSON.stringify(stationdata))
          );
        }
      });
      /**
       * 没有值的时候push一个
       * 在根据优惠券和商品瀑布流位置增加优惠券
       */
      if (allScroll.length === 0) {
        this.componentParams.push(JSON.parse(JSON.stringify(stationdata)));
      } else {
        this.componentParams.push(JSON.parse(JSON.stringify(stationdata)));
        this.componentParams.forEach(item => {
          if (item.title === "优惠券") {
            // 不能再第一个创建阴影，第一在抬起鼠标中判断
            // this.componentParams.splice(0, 1)
          }
          if (item.title === "商品瀑布流") {
            // 不能再最后一个创建阴影
            this.componentParams.splice(this.componentParams.length, 1);
          }
        });
      }
      // 点击时候反查数组allScroll中的index位置，通过vuex中index在更改选中
      // 88是店招 77是关闭 null没选中
      let names = "";
      let storeModelId = "";
      if (
        this.componentIndex === 88 ||
        this.componentIndex === 77 ||
        this.componentIndex === null
      ) {
        // 店招
      } else {
        names = allScroll[this.componentIndex].childTitle;
        storeModelId = allScroll[this.componentIndex].childStoreModelId;
      }

      let messages = `${
        this.chilidVal.title === "优惠券" ? "优惠卷模块默认展示在顶部，" : ""
      }请确认已配置${this.chilidVal.title}功能，如未配置${
        this.chilidVal.title
      }，装修发布后在手机端将隐藏${this.chilidVal.title}模块`;

      // 更新vuex中数据
      this.$store.dispatch("changeAllComponents", this.componentParams);
      // let newMoveLeft = this.componentIndex === null ? this.customDistanceToLefts - 35 : this.customDistanceToLefts - 210
      let newMoveLeft = this.customDistanceToLefts - 210;
      /**
       * @describe 移动事件
       */
      document.onmousemove = e => {
        e.preventDefault();
        // 点击元素的位置,用于计算用
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        // 控制移动阴影的大小，不带px单位的
        shadowDivLeft =
          left - (shadowDiv.offsetWidth / 2 - odiv.offsetWidth / 2);
        shadowDivtTop =
          top - (shadowDiv.offsetHeight / 2 - odiv.offsetHeight / 2);

        // 阴影移动真正的元素
        shadowDiv.style.left = shadowDivLeft + "px";
        shadowDiv.style.top = shadowDivtTop + "px";

        // 控制阴影在移动期间宽、高增加，缩小
        if (shadowDivLeft <= 375 && shadowDivLeft >= 100) {
          shadowDiv.style.width = shadowDivLeft + "px";
          shoBoxContent = shadowDivLeft;
          if (shadowDivLeft <= 200) {
            shadowDiv.style.height = shadowDivLeft + "px";
          }
        }

        this.componentParams.forEach(item => {
          if (item.id === 99) {
            item.isShowComp = false;
          }
        });
        /**
         * @describe 增加展示区域虚框的提示,进入和离开
         * store中的changeCustomDashed函数控制显示隐藏，默认false
         */
        showLeftContent = shadowDivLeft + shoBoxContent;
        if (
          showLeftContent >= newMoveLeft &&
          showLeftContent <= newMoveLeft + 375 * 2
        ) {
          this.$store.dispatch("changeCustomDashed", true);
        } else {
          this.$store.dispatch("changeCustomDashed", false);
        }
        /**
         * @describe 计算位置区域
         * shadowDivtTop 距离顶部高度
         * shadowDiv.offsetHeight 阴影本身高度最大200
         * atop 拖拽高度和自身高度
         * 每一个组件top和height相加会有5px误差，可以保留，防止组件高度太小会同时展示上下2个阴影
         * let zong = (item.childOffsetTop + item.childOffsetHeight + 5) // 这地方可以解决少的5px
         * this.okIndex 阴影的下标
         */
        let atop = shadowDivtTop + shadowDiv.offsetHeight + contetnScrollTop;
        if (allScroll.length === 0) {
          this.componentParams[0].isShowComp = true;
        } else {
          allScroll.forEach((item, index) => {
            let zong = item.childOffsetTop + item.childOffsetHeight;
            if (atop >= item.childOffsetTop && atop <= zong) {
              this.okIndex = index;
              this.componentParams[index + index].isShowComp = true;
              if (this.chilidVal.title === "优惠券") {
                this.okIndex = 0;
              } else {
                if (this.chilidVal.title === "商品瀑布流") {
                  this.okIndex = this.componentParams.length - 1;
                } else {
                  this.okIndex = index;
                }
              }
            }
            if (index === allScroll.length - 1 && atop >= zong) {
              this.componentParams[
                this.componentParams.length - 1
              ].isShowComp = true;
              this.okIndex = this.componentParams.length - 1;
            }
          });
        }
        this.componentParams.forEach(item => {
          if (item.id === 99) {
            if (item.isShowComp) {
              item.componentName = "stationBox";
            } else {
              item.componentName = "";
            }
          }
        });
        // 控制shadow的显示和隐藏
        this.showBox(left, shadowDivLeft);
      };
      /**
       * @describe 抬起事件
       */
      document.onmouseup = () => {
        this.componentParams.forEach((item, index) => {
          if (item.id === 99) {
            this.componentParams.splice(index, 1);
          }
        });
        let noCoupon = null;
        // 是否在展示区域放下
        if (
          showLeftContent >= newMoveLeft &&
          showLeftContent <= this.customDistanceToLefts + 375 * 2
        ) {
          // 要判断可以创造几个子组件
          let data = {
            ...JSON.parse(JSON.stringify(itemVal))
          };
          if (this.componentParams.length === 0) {
            if (
              this.chilidVal.title === "优惠券" ||
              this.chilidVal.title === "定金尾款" ||
              this.chilidVal.title === "限时抢购"
            ) {
              this.$message.warning(messages);
            }
            this.componentParams.push(data);
            this.$store.dispatch("changeAllComponents", this.componentParams);
          } else {
            let item = this.componentParams.find(item => {
              return item.componentName === itemVal.componentName;
            });
            /**
             * @describe 创建逻辑
             * i_single i_two i_three 除了这几个模块都只能创建一个;
             * 如果点击创建的是"优惠券",需要看现有数组中是否包含"优惠券"，如果不包含在第一位创建;
             * 如果点击创建的是"商品瀑布流",需要看现有数组中是否包含"商品瀑布流"，如果不包含在最后一位创建;
             * 如果点击创建是另外模块判断模块中是否包含"优惠券"或"商品瀑布流"，如果有,不能再第一或是最后做创建操作;
             * 除了单列图、双列图、三列图外的模块，只能创建一个
             */
            if (
              item &&
              !(
                item.componentName === "oneImg" ||
                item.componentName === "twoImg" ||
                item.componentName === "threeImg"
              )
            ) {
              this.$message.warning("相同模块，只能创建一个！！");
            } else {
              if (this.chilidVal.title === "优惠券") {
                if (this.componentParams && this.componentParams.length === 0) {
                  this.componentParams.push(data);
                } else {
                  this.componentParams.splice(this.okIndex, 0, data);
                }
              } else {
                if (this.chilidVal.title === "商品瀑布流") {
                  // 如果点击创建是商品瀑布流直接push到最后
                  this.$message.warning("商品瀑布流模块默认展示在底部");
                  this.componentParams.push(data);
                } else {
                  let noWater = this.componentParams.find(item => {
                    return item.title === "商品瀑布流";
                  });
                  if (noWater === undefined) {
                    // 没有商品瀑布流的
                    noCoupon = this.componentParams.find(item => {
                      return item.title === "优惠券";
                    });
                    if (noCoupon === undefined) {
                      this.componentParams.splice(this.okIndex, 0, data);
                    } else {
                      // 代表数组中有优惠券
                      if (this.okIndex === 0) {
                        this.$message.warning(
                          "优惠券模块必须在顶部，请在优惠券模块下创建其它模块！"
                        );
                      } else {
                        this.componentParams.splice(this.okIndex, 0, data);
                      }
                    }
                  } else {
                    // 不是优惠券
                    noCoupon = this.componentParams.find(item => {
                      return item.title === "优惠券";
                    });
                    if (noCoupon === undefined) {
                      // 代表数组中有商品瀑布流
                      if (this.okIndex > allScroll.length) {
                        this.$message.warning(
                          "商品瀑布流模块只能在最后一位，请在其上建立模块！"
                        );
                      } else {
                        this.componentParams.splice(this.okIndex, 0, data);
                      }
                    } else {
                      // 代表数组中有优惠券
                      if (this.okIndex === 0) {
                        this.$message.warning(
                          "优惠券模块必须在顶部，请在优惠券模块下创建其它模块！"
                        );
                      } else {
                        this.componentParams.splice(this.okIndex, 0, data);
                      }
                    }
                  }
                }
              }
              if (
                this.chilidVal.title === "优惠券" ||
                this.chilidVal.title === "定金尾款" ||
                this.chilidVal.title === "限时抢购"
              ) {
                this.$message.warning(messages);
              }
              // 反选下标
              this.componentParams.forEach((item, index) => {
                if (
                  item.title === names &&
                  storeModelId === item.storeModelId
                ) {
                  this.$store.dispatch("changeAllComponetIndex", index);
                }
              });
              // this.componentParams.push(data);
              this.$store.dispatch("changeAllComponents", this.componentParams);
            }
          }
        }
        // 重置初始化样式
        shadowDiv.style.zIndex = -1;
        shadowDiv.style.width = "100px";
        shadowDiv.style.height = "100px";
        document.onmousemove = null;
        document.onmouseup = null;
        // 隐藏边框显示
        this.$store.dispatch("changeCustomDashed", false);
        // 只要放下就重置隐藏阴影
        this.showBox(0, 0);
      };
    },
    /**
     * @describe 获取vuex中所有数组中元素的高度
     */
    getChildElementScrollTop() {
      let childObejct = [];
      if (this.allComponetVuex.length === 0) {
        return childObejct;
      }
      // console.log(document.getElementsByClassName('componentBox')[0].children[])
      // childOffsetTop:
      //   document.getElementsByClassName(item.componentName)[0].offsetTop +
      //   200,
      this.allComponetVuex.forEach((item, index) => {
        let cc = {
          childIndex: index,
          childOffsetTop:
            document.getElementsByClassName("componentBox")[0].children[index]
              .offsetTop + 200,
          childOffsetHeight: document.getElementsByClassName(
            item.componentName
          )[0].offsetHeight
        };
        childObejct.push(cc);
      });
      return childObejct;
    },
    /**
     * @describe 数组进行排序
     */
    sortArr(arr, index, tindex) {
      if (index > tindex) {
        arr.splice(tindex, 0, arr[index]);
        arr.splice(index + 1, 1);
      } else {
        arr.splice(tindex + 1, 0, arr[index]);
        arr.splice(index, 1);
      }
    },
    /**
     * @describe 修改透明度 宽度 高度
     */
    showBox(left, offsetLeft) {
      let shadowDiv = this.$refs.shadowRef;
      let newLeft = left - offsetLeft;
      if (newLeft > 1 && newLeft < 10) {
        shadowDiv.style.opacity = 0.1;
      } else if (newLeft >= 10 && newLeft < 20) {
        shadowDiv.style.opacity = 0.2;
      } else if (newLeft >= 20 && newLeft < 30) {
        shadowDiv.style.opacity = 0.3;
      } else if (newLeft >= 30 && newLeft < 40) {
        shadowDiv.style.opacity = 0.4;
      } else if (newLeft >= 40 && newLeft < 50) {
        shadowDiv.style.opacity = 0.5;
      } else if (newLeft >= 50 && newLeft < 60) {
        shadowDiv.style.opacity = 0.6;
      } else if (newLeft >= 60 && newLeft < 70) {
        shadowDiv.style.opacity = 0.65;
      } else if (newLeft >= 70 && newLeft < 80) {
        shadowDiv.style.opacity = 0.68;
      } else if (newLeft >= 80 && newLeft < 90) {
        shadowDiv.style.opacity = 0.7;
      } else if (newLeft >= 90 && newLeft < 100) {
        shadowDiv.style.opacity = 0.75;
      } else if (newLeft >= 100) {
        shadowDiv.style.opacity = 0.8;
      } else {
        shadowDiv.style.opacity = 0;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.modular {
  .m_title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    border-bottom: 1px solid #e8dede;
  }
  .ant-collapse-item {
    background: #fff;
    text-align: left;
    border: none;
    /deep/.ant-collapse-content {
      border: none;
    }
  }
  .ant-collapse-icon-position-left,
  .ant-collapse-content {
    border: none;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      list-style: none;
      width: 133px;
      display: flex;
      flex-direction: column;
      height: 77px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 40px;
      }
    }
  }
  .shadow {
    opacity: 0;
    z-index: -1;
    cursor: pointer;
  }
  .moduleShadow {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
    background: #a9a9a9;
    color: #fff;
    border-radius: 10px;
    img {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
<style lang="less" scoped>
.modular {
  height: 100%;
  overflow: auto;
  .m_title {
    height: 85px;
    line-height: 85px;
    font-size: 20px;
    border-bottom: 1px solid #e8dede;
    padding-left: 40px;
    color: #60696e;
  }
  .ant-collapse-item {
    background: #fff;
    text-align: left;
    border: none;
    /deep/.ant-collapse-content {
      border: none;
    }
  }
  .ant-collapse-icon-position-left,
  .ant-collapse-content {
    border: none;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0;
    li {
      list-style: none;
      width: 170px;
      display: flex;
      flex-direction: column;
      height: 141px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 18px;
      p {
        margin: 0;
        margin-top: 20px;
        font-size: 18px;
        color: #60696e;
        // -webkit-user-select:none;
        // -moz-user-select:none;
        // -o-user-select:none;
        // user-select:none;
      }
      img {
        width: 46px;
        // -webkit-user-select:none;
        // -moz-user-select:none;
        // -o-user-select:none;
        // user-select:none;
      }
    }
  }
  .shadow {
    opacity: 0;
    z-index: -1;
    cursor: pointer;
  }
  .moduleShadow {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
    background: #a9a9a9;
    color: #60696e;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    flex-direction: column;
    img {
      width: 45px;
      height: 45px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      user-select: none;
    }
  }
}
/deep/.ant-collapse-header {
  background: #eff0f1;
  color: #60696e !important;
  font-size: 18px;
  height: 50px;
  line-height: 24px !important;
}
</style>
