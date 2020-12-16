<template>
	<div>
		<h2>Zobacz odpowiedzi</h2>
		<div v-if="generateTest">
			<!--			<p>-->
			<!--				Użytkownik:-->
			<!--				<a :href="`mailto:${result.user.email}`"-->
			<!--				>{{ result.user.name }} {{ result.user.lastname }}</a-->
			<!--				>-->
			<!--			</p>-->
			<p>Test: {{ generateTest.test.name }}</p>
			<b-card>
				<QuestionResult
					v-for="(task, index) in tasks"
					:key="index"
					:question-result="task"
					:disabled="true"
				/>
			</b-card>
		</div>
	</div>
</template>

<script>
import { getGenerateTest } from '../../api/generateTestAPI';
import { getGenerateTaskByGenerateTestId } from '../../api/generateTaskAPI';
import QuestionResult from '../../components/Results/QuestionResult';

export default {
	name: 'GenerateTest',
	components: { QuestionResult },
	data() {
		return {
			generateTest: {},
			generateTestId: this.$route.params.generateTestId,
			tasks: [],
		};
	},
	mounted() {
		this.getGenerateTest();
	},
	methods: {
		async getGenerateTest() {
			this.loading = true;
			try {
				let [generateTest, generateTasks] = await Promise.all([
					getGenerateTest(this.generateTestId),
					getGenerateTaskByGenerateTestId(this.generateTestId),
				]);
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
