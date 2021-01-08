<template>
  <div class="home">
    <a-layout id="components-layout-demo-custom-trigger">
      <!-- 左侧区域 -->
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo"></div>
        <Menu />
      </a-layout-sider>
      <!-- 右侧区域 -->
      <a-layout>
        <!-- 右侧-顶部 -->
        <a-layout-header class="header">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <div class="userBox">
            <div>用户信息</div>
          </div>
        </a-layout-header>
        <!-- 右侧-内容 -->
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px'
          }"
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import Menu from "@/components/Menu/index.vue";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    Menu
  }
};
</script>
<style scope lang="less">
.home {
  height: 100%;
  .ant-layout {
    height: 100%;
    .ant-layout {
      text-align: left;
    }
  }
  .header {
    background: #fff;
    padding: 0;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
  }
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  line-height: 32px;
  color: #f10;
}
</style>
