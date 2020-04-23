import Vue from "vue";
import Router from "vue-router";

import HelloWorld from "@/components/HelloWorld";
import Cottage from "@/views/Cottage/Cottage";

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
    }
  ]
});
