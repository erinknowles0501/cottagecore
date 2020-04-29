<template>
	<v-container>
		<h3>Town</h3>
		<pre>{{ myCoven }}</pre>
	</v-container>
</template>

<script>
import { store, getData } from "../../store/covenStore";

export default {
	data() {
		return {
			myCoven: null
		};
	},
	async created() {
		await getData();
		this.myCoven = store.myCoven;
	}
};
</script>
