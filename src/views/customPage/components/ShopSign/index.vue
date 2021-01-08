<template>
  <div
    :class="{ shopSign: true }"
    :style="{
      border: classStyle,
      backgroundImage: `url(${shopSignList.backImg})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }"
    @click="shopSign"
  >
    <!-- 顶部搜索区域 -->
    <div class="s_head">
      <div class="s_h_l">
        <img src="@/assets/leftIcon.png" width="20px" height="22px" alt="" />
      </div>
      <a-input ref="userNameInput" placeholder="三门冰箱">
        <!-- <a-icon slot="prefix" type="search" /> -->
      </a-input>
      <img class="serchImg" src="@/assets/searchImg.png" width="22px" height="24px" alt="" />
      <div class="s_h_r">
        <img src="@/assets/commonIcon.png" width="20px" height="23px" alt="" />
      </div>
    </div>
    <!-- 店铺信息 -->
    <div class="s_shop">
      <div class="s_s_left">
        <div class="s_s_l_img" v-if="shopSignList.logo">
          <img
            :src="shopSignList.headImg ? shopSignList.headImg : imgStation"
            width="100%"
            height="100%"
            alt=""
          />
        </div>
        <div class="s_s_l_content">
          <div class="s_s_l_c_t">名称 <a-icon type="right" /></div>
          <div class="s_s_l_c_a">
            <ul class="s_s_l_c_a_ul">
              <li v-for="item in signList" :key="item.id">{{ item.title }}</li>
            </ul>
            <a-rate class="s_s_l_c_a_a" :default-value="5" disabled />
            <p></p>
          </div>
        </div>
      </div>
      <div class="s_s_follow">
        <p>+关注</p>
      </div>
    </div>
    <!-- 地址定位 -->
    <div class="s_address">
      <template>
        <div class="s_a_Icon">
          <img :src="positionImg" width="14px" height="16px" alt="" />
        </div>
        <p>店铺地址</p>
        <div class="s_a_go">前往</div>
      </template>
    </div>
    <!-- table切换按钮 -->
    <div class="s_table">
      <ul>
        <li v-for="item in tableList" :key="item.id">
          <span :class="{ active: item.id === 0 }">{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "shopSign",
  data() {
    return {
      msg: "店招区域",
      isChange: false,
      signList: [{ title: "官方", id: 0 }],
      tableList: [
        { title: "精选", id: 0 },
        { title: "商品", id: 1 },
        { title: "活动", id: 2 },
        { title: "上新", id: 3 },
        { title: "场景", id: 4 }
      ],
      shopSignList: {}, //当前页面的数据
      imgStation: require("@/assets/sonw.png"),
      positionImg: require('@/assets/position.png'),
    };
  },
  props: {
    classStyle: {
      type: String,
      default: "none"
    }
  },
  computed: {
    ...mapGetters(["shopSignData", "allComponetIndex"])
  },
  watch: {
    shopSignData: {
      handler: function(newVal) {
        // selected 精选 upNew上新 scene场景
        // 等着优化
        let newTableList = [
          { title: "精选", id: 0 },
          { title: "商品", id: 1 },
          { title: "活动", id: 2 },
          { title: "上新", id: 3 },
          { title: "场景", id: 4 }
        ];
        // 精选 0
        if (newVal.selected) {
          // let item = newTableList.find(item => {
          //   return item.title == "精选";
          // });
          // console.log(item);
        } else {
          newTableList.splice(0, 1);
        }
        // 上新
        if (newVal.upNew) {
          // let item = newTableList.find(item => {
          //   return item.title == "上新";
          // });
          // console.log(item);
        } else {
          if (newVal.selected) {
            newTableList.splice(3, 1);
          } else {
            newTableList.splice(2, 1);
          }
        }
        // 场景
        if (newVal.scene) {
          // let item = newTableList.find(item => {
          //   return item.title == "场景";
          // });
          // console.log(item);
        } else {
          newTableList.splice(newTableList.length - 1, 1);
        }
        this.tableList = newTableList;
        this.shopSignList = newVal;
      },
      immediate: true,
      deep: true
    },
    allComponetIndex: {
      handler: function(newVal) {
        // 如果为null直接为点击店招
        if (newVal === null) {
          this.$emit("changeOperation", 88);
        }
      },
      deep: true
    }
  },
  methods: {
    /**
     * @describe 修改88为店招
     */
    shopSign() {
      this.isChange = !this.isChange;
      let ind = this.isChange ? 88 : null;
      this.$emit("changeOperation", ind);
    }
  }
};
</script>
<style lang="less" scoped>
.shopSign {
  height: 230px;
  padding-bottom: 30px;
  background: #474747;
  color: #fff;
  border: 3px solid #474747;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .s_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    height: 44px;
    position: relative;
    .serchImg{
      position: absolute;
      left: 55px;
      top: 11px;
    }
    /deep/.ant-input {
      background: #000;
      border: none;
      border-radius: 17px;
      color: #fff;
      padding-left: 42px;
      opacity: 0.25;
      line-height: 32px;
    }
    /deep/.ant-input-prefix {
      color: #fff;
    }
    /deep/.anticon svg {
      width: 22px;
      height: 24px;
    }
    /deep/input::-webkit-input-placeholder {
      color: #ffffff;
    }
    .s_h_l {
      margin-right: 10px;
    }
    .s_h_r {
      margin-left: 14px;
    }
  }
  .s_shop {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    .s_s_left {
      display: flex;
      height: 50px;
      .s_s_l_img {
        width: 50px;
        height: 50px;
        background: #fff;
        border-radius: 5px;
        margin-right: 10px;
        overflow: hidden;
      }
      .s_s_l_content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .s_s_l_c_a {
          display: flex;
          align-items: center;
          font-size: 12px;
          margin-top: 5px;
          .s_s_l_c_a_ul {
            margin: 0;
            li {
              list-style: none;
              background: #8d8c8c;
              border-radius: 5px;
              padding: 0 3px;
            }
          }
          .s_s_l_c_a_a {
            ul {
              line-height: 5px;
              margin: 0 10px;
              li {
                list-style: none;
              }
            }
          }
          /deep/ .ant-rate {
            font-size: 12px;
            margin: 0 5px;
          }
          /deep/.ant-rate-star {
            font-size: 12px;
            margin-right: 3px;
          }
        }
      }
    }
    .s_s_follow {
      margin-top: 2px;
      p {
        height: 24px;
        display: flex;
        align-items: center;
        border: 1px solid #959494;
        border-radius: 30px;
        padding: 0 7px !important;
        font-size: 12px;
      }
    }
  }
  .s_address {
    display: flex;
    margin-left: 10px;
    font-size: 12px;
    .s_a_Icon {
      margin-right: 5px;
    }
    .s_a_go {
      margin-left: 10px;
      color: #f10;
    }
  }
  .s_table {
    ul {
      display: flex;
      justify-content: space-between;
      margin: 0 10px 8px 10px;
      height: 28px;
      li {
        list-style: none;
        padding-bottom: 5px;
        flex: 1;
        span {
          display: inline-block;
          padding: 2px;
        }
      }
      .active {
        border-bottom: 2px solid #5e68e1;
      }
    }
  }
}
</style>
