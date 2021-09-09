<template>
	<v-container>
		<h3>Town</h3>
		<v-card v-if="!!myCoven && myCoven.length !== 0">
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
		<v-card v-else>
			<v-card-title>You're not a member of any coven!</v-card-title>
			<v-card-subtitle>It's dangerous to go alone...</v-card-subtitle>
		</v-card>
	</v-container>
</template>

<script>
import { store, getData } from "../../store/covenStore";

export default {
	data() {
		return {
			myCoven: [],
			members: [],
		};
	},
	created() {
		this.initialize(); // unsafe to have async Vue lifestyle hooks
	},
	methods: {
		async initialize() {
			await getData();
			this.myCoven = store.myCoven;
			this.members = store.members;
		},
	},
};
</script>
