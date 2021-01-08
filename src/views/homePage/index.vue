<template>
  <div class="homePage">
    <!-- <a-button type="danger" @click="changeLoad">点击切换loading</a-button> -->
    <a-button type="primary" @click="primary">跳转自定义拖拽店铺</a-button>
    <!-- <a-button type="primary" @click="primaryVue">跳转vuedraggable</a-button> -->
    <!-- <a-button type="primary" @click="threeVue">跳转three</a-button> -->
    <a-skeleton
      active
      :avatar="SkeletonAvatarProps"
      :paragraph="SkeletonParagraphProps"
      :title="SkeletonTitleProps"
      :loading="isSkeleton"
    >
    </a-skeleton>
  </div>
</template>
<script>
import { utils } from "@/util/pushPage";
export default {
  name: "homePage",
  data() {
    return {
      isSkeleton: true,
      SkeletonAvatarProps: {
        size: "large",
        shape: "square"
      },
      SkeletonParagraphProps: {
        rows: 3,
        width: [300, 200, 100]
      },
      SkeletonTitleProps: {
        width: 100
      }
    };
  },
  mounted() {
    console.log(utils);
    this.changeTime(true, 1200);
    this.$store.dispatch("changeLoad");
    this.changeTime(false, 1000);
  },
  methods: {
    /**
     * @describe 模拟打开&关闭loading
     */
    changeLoad() {
      this.$store.dispatch("changeLoad");
      this.changeTime(false, 1000);
    },
    /**
     * @describe 定时器方法
     */
    changeTime(boolean, delay) {
      let time = null;
      clearTimeout(time);
      time = setTimeout(() => {
        boolean
          ? (this.isSkeleton = false)
          : this.$store.dispatch("changeLoad");
        clearTimeout(time);
      }, delay);
      time;
    },
    /**
     * @describe 跳转自定义模板
     */
    primary() {
      this.$router.push({ path: "/custom" });
    },
    primaryVue() {
      this.$router.push({ path: "/vuedraggable" });
    },
    threeVue() {
      this.$router.push({ path: "/threeVue" });
    }
  }
};
</script>
<style scoped lang="less">
.homePage {
  button {
    margin-right: 8px;
    margin-bottom: 12px;
  }
}
.userBox {
  border: 1px solid #b6b6b6;
  width: 300px;
  height: 200px;
  border-radius: 5px;
  padding: 20px;
  margin: 20px 0;
  // background: url("../../assets/sonw.jpg") no-repeat 0px 0px;
  // background-size: 300px 200px;
  .titleImg {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>
