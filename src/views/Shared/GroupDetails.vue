<template>
	<div>
		<h1>Szczegóły grupy - {{ form.name }}</h1>
	</div>
</template>

<script>
import * as groupAPI from '@/api/groupAPI';

export default {
	name: 'GroupDetails',
	props: ['groupID'],
	data() {
		return {
			loading: false,
			form: {},
		};
	},
	mounted() {
		this.getSubject();
	},
	methods: {
		async getSubject() {
			this.loading = true;
			try {
				const response = await groupAPI.getGroup(
					this.$route.params.groupID,
				);
				this.form = response.data;
			} catch (e) {
				this.$store.toast('error', e);
			}
			this.loading = false;
		},
	},
};
</script>

<style scoped></style>
