<template>
	<v-container>
		<h2>Sign up</h2>
		<v-form v-model="valid" @submit.prevent="formSubmit">
			<v-row>
				<v-text-field
					filled
					type="text"
					label="Email"
					:rules="emailRules"
					v-model="email"
					required
				>
				</v-text-field>
			</v-row>

			<v-row>
				<v-text-field
					height="20"
					filled
					required
					:rules="passwordRules"
					type="password"
					label="Password"
					hint="Minimum 10 characters"
					v-model="password"
				>
				</v-text-field>
			</v-row>
			<v-row
				><v-text-field
					height="20"
					filled
					required
					:rules="passwordConfirmRules"
					type="password"
					label="Password (confirm)"
					v-model="passwordConfirm"
				>
				</v-text-field>
			</v-row>

			<v-row>
				<v-text-field
					type="text"
					required
					:rules="usernameRules"
					hint="This is how other users will see your name. This cannot be
            changed later!"
					persistent-hint
					filled
					label="Username"
					v-model="username"
					validate-on-blur
					:error-messages="errors"
					:success-messages="successes"
					@blur="checkExists"
					ref="usernameField"
				>
				</v-text-field>
			</v-row>
			<v-row>
				<v-btn :disabled="!valid" color="secondary" type="submit">
					Sign up
				</v-btn>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
	data() {
		return {
			email: null,
			password: null,

			passwordRules: [
				v => !!v || "Password is required",
				v =>
					(v && v.length >= 5) ||
					"Password much be at least 5 characters"
			],
			emailRules: [
				v => !!v || "E-mail is required",
				v =>
					/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
					"E-mail is invalid"
			],
			passwordConfirmRules: [
				v => (v && v === this.password) || "Passwords do not match"
			],
			usernameRules: [
				v => !!v || "A username is required.",
				v => /^[a-z0-9-]+$/i.test(v) || "Alphanumeric and dashes only."
				// v =>
				//   (!!v && !this.checkExists(v)) ||
				//   "This username is already taken. Try adding dashes or different capitalization."
			],
			passwordConfirm: null,
			username: null,
			valid: true,
			// should object these error and success messages but currently only usernameField uses them so
			// when i say object i mean like errors: { usernameErrors: [], passwordErrors: [] } etc.
			errors: "",
			successes: ""
		};
	},
	methods: {
		formSubmit() {
			console.log(this.email, this.password, this.alias);
			if (this.valid) {
				firebase
					.auth()
					.createUserWithEmailAndPassword(this.email, this.password)
					.then(cred => {
						db.collection("users")
							.doc(this.username)
							.set({
								username: this.username,
								userUid: cred.user.uid
							})
							.then(
								this.$router.push({
									name: "User",
									params: { userId: cred.user.uid }
								})
							);
					})
					.catch(error => console.log("Error: ", error));
			}
		},
		async checkExists(v) {
			// remove errors+successes so can start fresh
			this.errors = "";
			this.successes = "";

			this.$refs.usernameField.loading = true;

			await db
				.collection("users")
				.doc(this.username)
				.get()
				.then(doc => {
					if (doc.exists) {
						console.log("exists!");
						this.errors =
							"This username is already taken. Try adding dashes or different capitalization";
					} else {
						this.successes = "This username is available!";
						console.log("doesn't exist!");
					}
				});

			this.$refs.usernameField.loading = false;
		}
	}
};
</script>

<style scoped>
.container {
	width: 60%;
	min-width: 300px;
}

.row {
	margin-bottom: 1rem;
}
</style>
