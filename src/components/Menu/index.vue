<template>
  <div class="hello">
    <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
      <template v-for="item in list">
        <a-menu-item
          v-if="!item.children"
          :key="item.key"
          @click="menuList(item.urls)"
        >
          <a-icon :type="item.iconType" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu
          v-else
          :key="item.key"
          :menu-info="item"
          @menuList="menuList"
        />
      </template>
    </a-menu>
  </div>
</template>

<script>
const SubMenu = {
  template: `
        <a-sub-menu v-else :key="menuInfo.key">
          <span slot="title"><a-icon :type="menuInfo.iconType" /><span>{{menuInfo.title}}</span></span>
          <a-menu-item v-for="items in menuInfo.children" :key="items.key" @click="menuList(${`items.urls`})">
            <a-icon :type="items.iconType" />
            <span>{{ items.title }}</span>
          </a-menu-item>
        </a-sub-menu>
    `,
  name: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    menuList(e) {
      this.$emit("menuList", e);
    }
  }
};

import datas from "./datas.js";
export default {
  name: "hello",
  props: {
    msg: String
  },
  components: {
    "sub-menu": SubMenu
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.list = datas.list;
  },
  methods: {
    menuList(e) {
      this.$router.push({
        path: e
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  color: #fff;
  text-align: left;
}
</style>
