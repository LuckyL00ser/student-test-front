<template>
	<div>
		<h2>Testy które wypełniłeś</h2>
		<TestsList :data="tests.map(x => x.test)" :loading="loading">
			<template v-slot:actions="{ data }">
				<template v-if="$store.state.user.role == 'teacher'">
					<router-link
						:to="{ name: 'RateTest', params: { testID: data.item.id } }"
						>Oceń</router-link
					>
				</template>
			</template>
		</TestsList>
	</div>
</template>

<script>
import { getGenerateTestByUser } from '../../api/generateTestAPI';
import TestsList from '../../components/Tests/TestsList';

export default {
	name: 'TestsReadyToRate',
	components: { TestsList },
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
				let response = await getGenerateTestByUser(this.$store.state.user.id);
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
