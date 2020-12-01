<template>
	<div>
		<h2>Oceń test</h2>
		<div v-if="result">
			<p>
				Użytkownik:
				<a :href="`mailto:${result.user.email}`"
					>{{ result.user.name }} {{ result.user.lastname }}</a
				>
			</p>
			<p>Test: {{ result.generateTest.test.name }}</p>
			<b-card>
				<QuestionResult v-for="(task,index) in tasks" :key="index" :question-result="task" :result-id="resultId"/>
			</b-card>
		</div>
	</div>
</template>

<script>
import { getResult } from '../../api/resultAPI';
import { getGenerateTaskByGenerateTestId } from '../../api/generateTaskAPI';
import QuestionResult from '../../components/Results/QuestionResult';

export default {
	name: 'RateTest',
	components: { QuestionResult },
	data() {
		return {
			result: null,
			resultId: this.$route.params.resultId,
			tasks: [],
		};
	},
	mounted() {
		this.getResult();
	},
	methods: {
		async getResult() {
			this.loading = true;
			try {
				let response = await getResult(this.resultId);
				this.result = response.data;
				let generateTasks = await getGenerateTaskByGenerateTestId(
					this.result.generateTest.id,
				);

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
