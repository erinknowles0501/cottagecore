<template>
	<v-app>
		<v-app-bar app color="secondary">
			<v-btn color="purple" class="brand" x-large text to="/">
				cottagecore
			</v-btn>
			<v-spacer></v-spacer>
			<v-row justify="end">
				<v-btn color="red" text :to="{ name: 'Cottage' }"
					>my cottage</v-btn
				>
				<v-btn color="red" text :to="{ name: 'Town' }">town</v-btn>
				<v-btn color="red" text :to="{ name: 'City' }">city</v-btn>
				<v-btn color="red" text :to="{ name: 'Wilds' }">wilds</v-btn>
				<v-btn
					v-if="user"
					color="red"
					outlined
					:to="`/user/${user.userUid}`"
					>{{ user.username }}</v-btn
				>
				<v-btn color="primary" v-if="user" text @click="logout"
					>logout</v-btn
				>
				<v-btn color="accent" v-if="!user" text :to="{ name: 'Login' }"
					>login</v-btn
				>
				<v-btn
					color="accent"
					v-if="!user"
					outlined
					:to="{ name: 'Signup' }"
					>signup</v-btn
				>
			</v-row>
		</v-app-bar>
		<v-content>
			<v-container fluid>
				<router-view @login="checkAuthStateChanged" />
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
	name: "App",
	data() {
		return {
			user: null,
		};
	},
	created() {
		this.checkLoggedIn();
		this.checkAuthStateChanged();
	},
	// computed: {
	// 	currentUser() {
	// 		let tempUser = null;
	// 		firebase.auth().onAuthStateChanged(user => {
	// 			if (user) {
	// 				console.log(
	// 					"Current user uid: ",
	// 					firebase.auth().currentUser.uid
	// 				);
	// 				tempUser = firebase.auth().currentUser;
	// 			} else {
	// 				tempUser = null;
	// 			}
	// 		});
	// 		console.log("User changed! ", tempUser);
	// 		return tempUser;
	// 	}
	// },
	methods: {
		checkLoggedIn() {
			if (firebase.auth().currentUser) {
				const userUid = firebase.auth().currentUser.uid;
				this.getUserFromUid(userUid);
				return;
			}

			this.user = null;
		},
		checkAuthStateChanged() {
			const vm = this;
			firebase.auth().onAuthStateChanged(function (user) {
				if (user && !vm.user) {
					vm.getUserFromUid(user.uid);
				} else {
					vm.user = null;
				}
			});
		},
		async logout() {
			await firebase.auth().signOut();
			this.checkAuthStateChanged();
			this.$router.push({ name: "Login" });
		},
		getUserFromUid(uid) {
			db.collection("users")
				.doc(uid)
				.get()
				.then((doc) => (this.user = doc.data()))
				.catch((error) =>
					console.log(
						"Error getting user from current user uid: ",
						error
					)
				);
		},
	},
};
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.brand {
	font-family: "caveat", sans-serif;
	font-weight: 800 !important;
	font-size: 2em !important;
	text-transform: lowercase !important;
}
</style>
