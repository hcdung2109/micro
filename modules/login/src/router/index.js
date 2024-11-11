import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/components/Login.vue";

// Define your routes
const routes = [
  {
    path: "/",
    name: "Home",
    component: Login,
    //meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    //meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Add a route guard to check login state
/*router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem("accessToken"); // Check if token exists
    if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
        next({
            path: "/#/login",
            query: { redirect: to.fullPath },  // Save the intended route
        });
    } else {
        next(); // Proceed to the route
    }
});*/

export default router;
