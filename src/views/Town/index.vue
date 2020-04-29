<template>
	<v-container>
		<h3>Town</h3>
		<v-card>
			<v-card-title>{{ myCoven.name }}</v-card-title>
			<v-card-subtitle>{{ myCoven.type }}</v-card-subtitle>
			<v-card-text>
				<!-- v-for members -->
				<div v-for="member in members" :key="member.userUid">
					<router-link :to="`/user/${member.userUid}`">{{
						member.username
					}}</router-link>
				</div>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
import { store, getData } from "../../store/covenStore";

export default {
	data() {
		return {
			myCoven: null,
			members: null
		};
	},
	async created() {
		await getData();
		this.myCoven = store.myCoven;
		this.members = store.members;
	}
};
</script>
