import Vue from "vue";
import Router from "vue-router";

import HelloWorld from "@/components/HelloWorld";
import Cottage from "@/views/Cottage/Cottage";
import User from "@/views/User";
import Signup from "@/components/auth/Signup";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/cottage",
      name: "Cottage",
      component: Cottage
    },
    {
      path: "/user/:userId",
      name: "User",
      component: User
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    }
  ]
});
