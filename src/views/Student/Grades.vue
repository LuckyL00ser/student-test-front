<template>
	<div>
		<h2>Wypełnione testy:</h2>
		<b-radio value="all" v-model="onlyMarked">Wszystkie</b-radio>
		<b-radio value="marked_only" v-model="onlyMarked">Tylko ocenione</b-radio>
		<b-radio value="unmarked_only" v-model="onlyMarked"
			>Tylko nieocenione</b-radio
		>

		<ResultsList :loading="loading" :results="filtered" />
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
			onlyMarked: 'all',
		};
	},
	mounted() {
		this.getTests();
	},
	computed: {
		filtered() {
			if (this.onlyMarked === 'all') return this.tests;
			else if (this.onlyMarked === 'marked_only')
				return this.tests.filter(x => x.mark);
			return this.tests.filter(x => !x.mark);
		},
	},
	methods: {
		async getTests() {
			this.loading = true;
			try {
				let response = await getAllResults();
				this.tests = response.data.filter(
					x => x.user.id === this.$store.state.user.id,
				);
			} catch (e) {
				this.$store.toast('danger', e);
			}
			this.loading = false;
		},
	},
};
</script>

<style scoped></style>
