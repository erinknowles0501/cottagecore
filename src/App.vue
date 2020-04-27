<template>
	<v-app>
		<v-app-bar app color="secondary">
			<v-btn color="purple" class="brand" x-large text to="/">
				cottagecore
			</v-btn>
			<v-spacer></v-spacer>
			<v-row justify="end">
				<v-btn color="red" text to="/cottage">my cottage</v-btn>
				<v-btn color="red" text to="/town">town</v-btn>
				<v-btn color="red" text to="/city">city</v-btn>
				<v-btn color="red" text to="/wilds">wilds</v-btn>
				<v-btn
					v-if="currentUser"
					color="red"
					outlined
					:to="`/user/${currentUser.uid}`"
					>{{ currentUser.displayName }}</v-btn
				>
				<v-btn color="primary" v-if="currentUser" text @click="logout"
					>logout</v-btn
				>
				<v-btn color="accent" v-if="!currentUser" text @click="logout"
					>login</v-btn
				>
				<v-btn
					color="accent"
					v-if="!currentUser"
					outlined
					@click="logout"
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
			//
		};
	},
	computed: {
		currentUser() {
			let user = null;
			firebase.auth().onAuthStateChanged(user => {
				if (user) {
					console.log(
						"Current user uid: ",
						firebase.auth().currentUser.uid
					);
					user = firebase.auth().currentUser;
				} else {
					user = null;
				}
			});
			console.log("User changed! ", user);
			return user;
		}
	},
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
