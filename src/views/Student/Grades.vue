<template>
	<div>
		<ResultsList :loading="loading" :results="tests" />
	</div>
</template>

<script>
import { getAllResults } from '../../api/resultAPI';
import ResultsList from '../../components/Results/ResultsList';

export default {
	name: 'Grades',
	components: { ResultsList },
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
		async getTests() {
			this.loading = true;
			try {
				let response = await getAllResults();
				this.tests = response.data.filter(x => x.user.id === this.$store.state.user.id && x.mark !== null);
			} catch (e) {
				this.$store.toast('danger', e);
			}
			this.loading = false;
		},
	},
};
</script>

<style scoped></style>
