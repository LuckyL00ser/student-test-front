<template>
	<div>
		<h2>Testy oczekujace do oceny</h2>
		<TestsList :data="tests" :extra-fields="extraFields" :loading="loading">
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
				let response = getGenerateTestByUser(this.$store.state.user.id); //zjebane gówno
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
