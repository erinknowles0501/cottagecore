import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import Cottage from "@/views/Cottage/Cottage";
import User from "@/views/User";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "Home",
			component: Home
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
		},
		{
			path: "/login",
			name: "Login",
			component: Login
		}
	]
});
