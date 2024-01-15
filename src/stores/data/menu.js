export const menuLink = [
  {
    title: "Bosh sahifa",
    path: "/dashboard",
    name: "dashboard",
    icon: "HomeFilled",
    component: () => import("@/views/dashboard.vue"),
  },
  {
    title: "Mahsulotlar",
    icon: "document",
    path: "/product",
    name: "product",
    component: () => import("@/views/product/products.vue"),
  },
  {
    title: "Narxlar",
    icon: "money",
    path: "/price",
    name: "price",
    component: () => import("@/views/product/prices.vue"),
  },
];

