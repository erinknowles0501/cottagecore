// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import firebase from "firebase/app";

// new Vue({
//   vuetify
// }).$mount("#app");

Vue.config.productionTip = false;

let app = null;

firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		/* eslint-disable no-new */
		app = new Vue({
			el: "#app",
			router,
			vuetify,
			components: { App },
			template: "<App/>"
		});
	}
});
