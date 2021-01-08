<template>
  <div id="app">
    <router-view />
    <load v-if="load" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import load from "@/components/loading/index";
import { getItem } from "@/util/localStorage";
export default {
  computed: {
    ...mapGetters(["load"])
  },
  components: {
    load
  },
  created() {
    /**
     * 在app页面从新给store赋值
     * 确保store展示正确，后期看有什么好的优化！！！
     */
    if (!getItem("userInfo")) {
      this.$router.push({
        path: "/login"
      });
    } else {
      let params = getItem("userInfo");
      this.$store.dispatch("changeInfo", params);
    }
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  p {
    margin: 0;
    padding: 0;
  }
}
</style>
