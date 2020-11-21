<template>
	<div>
		<div>
			moje oceny
		</div>
		<!--		<TestsList :data="tests">-->
		<!--			<template>-->
		<!--				<router-link>Zobacz szczegóły </router-link>-->
		<!--			</template>-->
		<!--		</TestsList>-->
	</div>
</template>

<script>
import { getGenerateTestByUser } from '../../api/generateTestAPI';

export default {
	name: 'Grades',
	data() {
		return {
			tests: [],
			loading: false,
		};
	},
	mounted() {
		this.getTests();
	},
	methods: {
		getTests() {
			this.loading = true;
			try {
				let response = getGenerateTestByUser(this.$store.state.user.id);
				this.tests = response.data;
			} catch (e) {
				this.$store.toast('danger', e);
			}
			this.loading = false;
		},
	},
};
</script>

<style scoped></style>
