import firebase from "firebase";

export const store = {
	user: null
};

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		store.user = firebase.auth().currentUser;
	} else {
		store.user = null;
	}
});
