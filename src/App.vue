<template>
	<v-app>
		<v-app-bar app color="secondary">
			<v-col cols="12" sm="3">
				<v-btn color="purple" class="brand" x-large text to="/"
					>cottagecore</v-btn
				>
			</v-col>
			<v-col cols="12" sm="9">
				<v-row justify="end">
					<v-btn color="red" text to="/cottage">my cottage</v-btn>
					<v-btn color="red" text to="/town">town</v-btn>
					<v-btn color="red" text to="/city">city</v-btn>
					<v-btn color="red" text to="/wilds">wilds</v-btn>
				</v-row>
			</v-col>
		</v-app-bar>
		<v-content>
			<v-container fluid>
				<router-view />
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
export default {
	name: "App"
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
