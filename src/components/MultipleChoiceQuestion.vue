<template>
	<b-container fluid>
		<b-row class="mt-2">
			<b-col lg="12">
				<b-button class="btn btn-success float-right" @click="addQuestion()">
					Dodaj odpowiedź
				</b-button>
			</b-col>
		</b-row>
		<b-row v-for="(answer, index) in answer" :key="index" class="mt-2">
			<b-col sm="2">
				<label for="txt-answer" class="text-nowrap float-left">
					Odpowiedź {{ index + 1 }}:
				</label>
			</b-col>
			<b-col>
				<input
					id="txt-answer"
					v-model="answer[index]"
					type="text"
					placeholder="Odpowiedź..."
					class="col-12"
				/>
			</b-col>
			<b-col sm="1">
				<b-checkbox v-model="correct[index]" class="text-nowrap" size="lg" />
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
import * as AnswerAPI from '@/api/answerAPI';

export default {
	name: 'MultipleChoiceQuestion',
	props: ['TaskId'],
	data: function() {
		return {
			answer: [''],
			correct: [false],
		};
	},
	created() {
		if (this.TaskId != null) {
			const request = this.getTasksAnswer();
			if (request.length > 0) {
				for (let i = 0; i < request.length; i++) {
					this.answer[i] = request[i].answer;
					this.correct[i] = request[i].correct;
				}
			}
		}
	},
	methods: {
		async getTasksAnswer() {
			return await AnswerAPI.getAnswerByTaskId(this.TaskId);
		},

		addQuestion() {
			this.answer.push('');
			this.correct.push(false);
		},

		deleteQuestion(index) {
			if (this.answer.length > 1) {
				this.answer.splice(index, 1);
				this.correct.splice(index, 1);
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
