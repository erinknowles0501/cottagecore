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
					:to="`/user/${user.uid}`"
					>{{ user.displayName }}</v-btn
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
				<router-view />
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import firebase from "firebase";
export default {
	name: "App",
	data() {
		return {
			user: null
		};
	},
	created() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log(
					"Current user uid: ",
					firebase.auth().currentUser.uid
				);
				this.user = firebase.auth().currentUser;
			} else {
				this.user = null;
			}
		});
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
		logout() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.$router.push({ name: "Login" });
				});
		}
	}
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
