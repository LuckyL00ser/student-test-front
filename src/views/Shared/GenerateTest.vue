<template>
	<div>
		<h2>Wypełniony test</h2>
		<p>Użytkownik: {{}}</p>
		<p>Test: {{}}</p>

		<div></div>
	</div>
</template>

<script>
import { getGenerateTest } from '../../api/generateTestAPI';
import { getGenerateTaskByGenerateTestId } from '../../api/generateTaskAPI';

export default {
	name: 'GenerateTest',
	data() {
		return {
			generateTest: {},
			generateTestId: this.$route.params.generateTestId,
			tasks: []
		};
	},
	mounted() {
		this.getGenerateTest();
	},
	methods: {
		async getGenerateTest() {
			this.loading = true;
			try {
				let [generateTest,generateTasks] =  Promise.all([getGenerateTest(this.generateTestId),getGenerateTaskByGenerateTestId(this.generateTestId)])
				this.generateTest = generateTest.data;
				this.tasks = generateTasks.data;
			} catch (e) {
				this.$store.toast('error', e);
			}
			this.loading = false;
		},
	},
};
</script>

<style scoped></style>
