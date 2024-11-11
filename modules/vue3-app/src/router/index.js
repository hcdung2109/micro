import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import HelloWorld from "@/components/HelloWorld.vue";

// Define your routes
const routes = [
  {
    path: "/web/vue3",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/web/vue3/hello",
    name: "Hello",
    component: HelloWorld,
    meta: { requiresAuth: true }, // Protect this route
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Add a route guard to check login state
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("accessToken"); // Check if token exists
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next({
      path: "/#/login",
      query: { redirect: to.fullPath }, // Save the intended route
    });
  } else {
    next(); // Proceed to the route
  }
});

export default router;
