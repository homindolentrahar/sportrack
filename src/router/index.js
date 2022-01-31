import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase/config";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Create from "../views/Create.vue";
import Workout from "../views/Workout.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      auth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      auth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      auth: false,
    },
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {
      title: "Create",
      auth: true,
    },
  },
  {
    path: "/workouts/:id",
    name: "Workout",
    component: Workout,
    meta: {
      title: "Workout",
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Sportrack`;
  next();
});

router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();

  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }

    next({ name: "Login" });
    return;
  }

  next();
});

export default router;
