<template>
  <div
    :class="{ coupon: true }"
    :style="{ border: classStyle }"
    @click="cahngeFather"
  >
    <div class="coupon_box">
      <ul class="coupon_ul">
        <li v-for="item in couponList" :key="item.id">
          <div class="c_ul_li_left">
            <p>￥{{ item.del }}</p>
            <p>满{{ item.price }}元可用</p>
          </div>
          <div class="c_ul_li_right">领取</div>
        </li>
        <div class="c_ul_more">
          <div class="c_ul_m_box">
            <span>---</span>
            <p>查看更多</p>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import { Mixin } from "./../../mixin";
export default {
  name: "coupon",
  mixins: [Mixin],
  data() {
    return {
      couponList: [
        { id: 0, price: "1000", del: "500" },
        { id: 1, price: "1000", del: "500" },
        { id: 2, price: "1000", del: "500" }
      ]
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
.coupon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 64px;
  color: #fff;
  // background: #524a49;
  // border: 3px solid #f0f2f5;
  border-radius: 10px;
  position: relative;
  p {
    margin: 0;
  }
  li {
    list-style: none;
  }
  .coupon_box {
    overflow: hidden;
    // position: absolute;
    // top: -31px;
    // left: -90px;
    .coupon_ul {
      display: flex;
      align-items: center;
      width: 525px;
      margin: 0;
      li {
        width: 120px;
        height: 54px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: linear-gradient(180deg, #ff683b 1%, #ff4040);
        margin-right: 10px;
        .c_ul_li_left {
          width: 88px;
          height: 50px;
          font-size: 12px;
          background: linear-gradient(180deg, #fff6f5, #ffc7c0 98%);
          border-radius: 6px;
          color: #ff500e;
          display: flex;
          justify-content: center;
          flex-direction: column;
          margin-right: 3px;
          border-top-right-radius: 13px;
          border-bottom-right-radius: 13px;
          p:nth-child(1) {
            font-size: 16px;
            font-weight: bold;
          }
        }
        .c_ul_li_right {
          font-size: 12px;
          width: 20px;
        }
      }
      .c_ul_more {
        font-size: 12px;
        width: 55px;
        height: 54px;
        background: linear-gradient(90deg, #ffd9d4, #ffaca1);
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ff500e;
        .c_ul_m_box {
          width: 51px;
          height: 50px;
          background: linear-gradient(90deg, #fff6f5, #ffc7c0);
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          span {
            border: 1px solid #f10;
            width: 20px;
            height: 20xp;
            border-radius: 50%;
          }
          p {
            margin-top: 3px !important;
          }
        }
      }
    }
  }
}
.activeClass {
  border: 3px dashed #6cb1f1;
}
</style>
