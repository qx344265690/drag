<template>
  <div class="customPage">
    <a-layout id="components-layout">
      <a-layout-header class="header">
        <ul>
          <li
            v-for="item in headerList"
            :key="item.index"
            @click="btn(item.id)"
          >
            {{ item.title }}
          </li>
        </ul>
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          width="400"
          style="background: #fff"
          class="contetnShadow"
        >
          <Modular />
        </a-layout-sider>
        <a-layout style="padding: 24px 24px 24px" class="contetnShadow">
          <p class="currentPage">当前页面：{{ pageNames }}</p>
          <a-layout-content>
            <DisplayArea refs="boxss" />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import Modular from "./modular/index"; // 左侧-模块
import DisplayArea from "./displayArea/index"; // 右侧-展示区
export default {
  name: "customPage",
  data() {
    return {
      headerList: [
        { title: "保存", id: 0 },
        { title: "重置", id: 1 },
        { title: "预览", id: 2 },
        { title: "发布", id: 3 }
      ],
      pageNames: "首页"
    };
  },
  components: {
    Modular,
    DisplayArea
  },
  methods: {
    btn(ids) {
      if (ids === 1) {
        this.$store.dispatch("changeAllComponents", []);
      }
    }
  }
};
</script>

<style scope lang="less">
.customPage {
  height: 100%;
  overflow-y: hidden;
  .header {
    background: #fff;
    border-bottom: 1px solid #e8dede;
    // position: fixed;
    // z-index: 1;
    // width: 100%;
    ul {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 64px;
      li {
        list-style: none;
        border-left: 1px solid #e8dede;
        height: 28px;
        line-height: 28px;
        padding: 0 20px;
      }
      li:first-child {
        border: none;
      }
    }
    .contetnShadow {
      box-shadow: inset 0px 2px 21px -6px rgba(206, 213, 213, 0.5);
    }
  }
  .currentPage {
    position: fixed;
    font-size: 14px;
    color: #60696e;
  }
  #components-layout {
    height: 100%;
  }
}
.iframeBox {
  text-align: center;
  .iframeClass {
    border: 1px solid #d9d2d2;
  }
}
::-webkit-scrollbar-track-piece {
  background-color: #f5f5f5;
  border-left: 1px solid #d2d2d2;
}
::-webkit-scrollbar {
  width: 12px;
  height: 13px;
}
::-webkit-scrollbar-thumb {
  border: 1px solid #d9d9e1;
  background-color: #d9d9e1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  border: 1px solid #bbb5b5;
  background-color: #bbb5b5;
}
</style>
