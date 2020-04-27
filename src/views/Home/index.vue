<template
	><v-container
		><h1>Welcome to cottagecore</h1>
		<router-link :to="{ name: 'Signup' }">Sign up</router-link>
		<router-link :to="{ name: 'Login' }">Login</router-link>
	</v-container>
</template>

<script>
import firebase from "firebase";
export default {
	name: "Home",
	created() {
		console.log("Current user: ", firebase.auth().currentUser);
	}
};
</script>
