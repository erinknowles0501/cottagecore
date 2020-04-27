<template>
	<v-container>
		<div>{{ $route.params.userId }}</div>
		<div>
			<v-btn @click="updateProfile">Update profile</v-btn>
		</div>
	</v-container>
</template>

<script>
import firebase from "firebase";
export default {
	name: "User",

	methods: {
		updateProfile() {
			firebase
				.auth()
				.currentUser.updateProfile({
					displayName: "Beans"
				})
				.then(() => console.log("Success!"))
				.catch(error => console.log("error: ", error));
		}
	}
};
</script>
