<template>
	<v-container>
		<h1>Welcome to cottagecore</h1>
		<v-card v-if="isLoggedIn">Hello!!</v-card>
		<v-card v-else>
			<router-link :to="{ name: 'Signup' }">Sign up</router-link>
			<router-link :to="{ name: 'Login' }">Login</router-link>
		</v-card>
	</v-container>
</template>

<script>
import firebase from "firebase";
export default {
	name: "Home",
	data: () => ({
		isLoggedIn: false,
	}),
	created() {
		this.isLoggedIn = !!firebase.auth().currentUser;
	},
};
</script>
