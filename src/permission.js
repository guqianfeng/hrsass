import router from "@/router";
import store from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const whiteList = ["/login", "/404"];
router.beforeEach((to, from, next) => {
  NProgress.start();
  const token = store.getters.token;
  if (token) {
    if (to.path === "/login") {
      next("/");
      NProgress.done();
    } else {
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
      NProgress.done();
    }
  }
});
router.afterEach((to, from) => {
  NProgress.done();
});
