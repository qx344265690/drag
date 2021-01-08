import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/index.vue";
import User from "../views/user/user.vue";

Vue.use(VueRouter);
// 解决跳转相同路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const routes = [
  {
    path: "/",
    component: Home,
    children: [
      {
        //首页
        path: "/",
        name: "homePage",
        meta: { title: "首页", requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/homePage/index")
      },
      {
        //人员管理
        path: "/personnel",
        name: "personnel",
        meta: { title: "人员管理", requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/personnel/index")
      },
      {
        //订单管理
        path: "/order",
        name: "order",
        meta: { title: "订单管理", requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/order/index")
      },
      {
        //地球店
        path: "/shop/earth",
        name: "earth",
        meta: { title: "地球店", requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/shop/earth/index")
      },
      {
        //月球店
        path: "/shop/moon",
        name: "moon",
        meta: { title: "月球店", requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/shop/moon/index")
      }
    ]
  },
  {
    path: "/custom",
    name: "custom",
    meta: { title: "月球店", requiresAuth: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/customPage/index.vue")
  },
  {
    path: "/vuedraggable",
    name: "vuedraggable",
    meta: { title: "天球店", requiresAuth: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/vuedraggable/index.vue")
  },
  {
    path: "/threeVue",
    name: "threeVue",
    meta: { title: "three", requiresAuth: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/threeVue/index.vue")
  },
  {
    path: "/",
    name: "user",
    component: User,
    redirect: "/login",
    children: [
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Login")
      },
      {
        path: "/passWord",
        name: "passWord",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/forgotPassWord")
      },
      {
        path: "/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/register")
      }
    ]
  },
  {
    path: "/404",
    name: "notFound",
    component: () => import(/* webpackChunkName: "about" */ "../views/404.vue")
  },
  {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404"
  }
];

const router = new VueRouter({
  routes
});

export default router;
