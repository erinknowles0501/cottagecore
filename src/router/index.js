import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home";
import Cottage from "@/views/Cottage/Cottage";
import Town from "@/views/Town";
import User from "@/views/User";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";

import firebase from "firebase";

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: "/",
			name: "Home",
			component: Home
		},
		{
			path: "/cottage",
			name: "Cottage",
			component: Cottage,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/town",
			name: "Town",
			component: Town,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/user/:userId",
			name: "User",
			component: User,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/signup",
			name: "Signup",
			component: Signup,
			meta: {
				loggedInRedirect: true
			}
		},
		{
			path: "/login",
			name: "Login",
			component: Login,
			meta: {
				loggedInRedirect: true
			}
		}
	]
});

// check if route requires auth. If it does, check user status. If user, let them proceed. otherwise, redirect.
// Also check for loggedInRedirect (ie if a logged-in user tries to go to Sign Up page)

// TODO: better, store-based way to get current user
let currentUser = null;
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		currentUser = user;
	} else {
		currentUser = null;
	}
});
// let user = firebase.auth().currentUser;
// console.log("currentUser: ", user);

router.beforeEach((to, from, next) => {
	if (to.matched.some(rec => rec.meta.requiresAuth)) {
		if (currentUser) {
			next();
		} else {
			console.log("user: ", currentUser);
			next({ name: "Login" });
		}
	} else if (to.matched.some(rec => rec.meta.loggedInRedirect)) {
		if (currentUser) {
			next({ name: "Home" });
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
