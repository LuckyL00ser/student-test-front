<template>
	<b-container fluid>
		<b-row class="mt-2">
			<b-col lg="12">
				<b-button class="btn btn-success float-right" @click="addQuestion()">
					Dodaj odpowiedź
				</b-button>
			</b-col>
		</b-row>
		<b-row v-for="(answer, index) in answers" :key="index" class="mt-2">
			<b-col sm="2">
				<label for="txt-answer" class="text-nowrap float-left">
					Odpowiedź {{ index + 1 }}:
				</label>
			</b-col>
			<b-col>
				<input
					id="txt-answer"
					v-model="answers[index]"
					type="text"
					placeholder="Odpowiedź..."
					class="col-12"
				/>
			</b-col>
			<b-col sm="1">
				<b-checkbox v-model="isCorrect[index]" class="text-nowrap" size="lg" />
			</b-col>
			<b-col sm="1">
				<b-button class="btn btn-danger btn-sm" @click="deleteQuestion(index)">
					X
				</b-button>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import * as TaskAPI from '@/api/taskAPI';

export default {
	name: 'MultipleChoiceQuestion',
	props: ['TaskId'],
	data: function() {
		return {
			answers: [''],
			isCorrect: [false],
		};
	},
	created() {
		// if(this.TaskId != null) {
		// 	const request = this.getTask();
		// }
	},
	methods: {
		async getTask() {
			return await TaskAPI.getTask(this.TaskId);
		},

		addQuestion() {
			this.answers.push('');
			this.isCorrect.push(false);
		},

		deleteQuestion(index) {
			if (this.answers.length > 1) {
				this.answers.splice(index, 1);
				this.isCorrect.splice(index, 1);
			} else {
				this.$store.toast(
					'danger',
					'Pytanie musi zawierać co najmniej jedną odpowiedź.',
				);
			}
		},
	},
};
</script>

<style scoped></style>
