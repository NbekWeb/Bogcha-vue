import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/user/auth";
import cookie from 'vue-cookies';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("../layout/main.vue"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/dashboard.vue"),
        },
        {
          path:"/product",
          name: "product",
          component: () => import("@/views/product/products.vue"),
        },
      ],
    },
    {
      path: "/reg",
      component: () => import("../layout/auth.vue"),
      children: [
        {
          path: "/reg",
          name: "reg",
          component: () => import("../views/auth/reg.vue"),
        },
        {
          path: "/login",
          name: "login",
          component: () => import("../views/auth/login.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name == "login" || to.name == "reg"){ 
    // console.log('1');
    next()
  }
  else {
    if(cookie.get('bogcha-token')){
      next()
    }
    else{
      // console.log('sasa');
      router.push('/login')
    }
    
  }
});

export default router;
