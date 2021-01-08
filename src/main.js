import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { getItem } from "@/util/localStorage";
import "./core/lazy_use";
Vue.use(Antd);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.requiresAuth)) {
    // 需要校验是否登录 還是有問題，數組循環判斷
    if (!getItem("userInfo")) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
