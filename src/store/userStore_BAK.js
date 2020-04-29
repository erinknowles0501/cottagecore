import db from "@/firebase/init";
import firebase from "firebase";

export const store = {
	user: null
};

export const getters = {
	user: () => store.user
};

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		console.log("Store user changed");
		store.user = firebase.auth().currentUser;
	} else {
		console.log("Store user changed");
		store.user = null;
	}
});

export const actions = {
	async logout() {
		await firebase.auth().signOut();
	}
};
