<template>
	<b-container fluid>
		<b-row class="mt-2">
			<b-col lg="12">
				<b-button class="btn btn-success float-right" @click="addQuestion()">
					Dodaj odpowiedź
				</b-button>
			</b-col>
		</b-row>
		<b-row v-for="(item, index) in answers" :key="index" class="mt-2">
			<b-col sm="2">
				<label for="txt-answers" class="text-nowrap float-left">
					Odpowiedź {{ index + 1 }}:
				</label>
			</b-col>
			<b-col>
				<input
					id="txt-answers"
					v-model="answers[index].answer"
					type="text"
					placeholder="Odpowiedź..."
					class="col-12"
				/>
			</b-col>
			<b-col sm="1">
				<b-checkbox v-model="answers[index].correct" class="text-nowrap" size="lg" />
			</b-col>
			<b-col sm="1">
				<b-button class="btn btn-danger btn-sm" @click.prevent="deleteQuestion(index)" v-if="answers.length>1">
					X
				</b-button>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import * as AnswerAPI from '@/api/answerAPI';
import { deleteAnswer } from '../api/answerAPI';

export default {
	name: 'MultipleChoiceQuestion',
	props: ['taskId'],
	data: function() {
		return {
			answers: [
				{
					answer: '',
					correct: false
				}
			]
		};
	},
	async created() {
		if(this.taskId)  {
			await this.getTasksAnswer();
		}
	},
	methods: {
		async getTasksAnswer() {
			const response = await AnswerAPI.getAnswersByTaskId(this.taskId);
			this.answers = response.data
		},

		addQuestion() {
			this.answers.push({
				answer: '',
				correct: false
			});
			//this.correct.push(false);
		},

		async deleteQuestion(index) {
			if(this.answers[index].id){
				await deleteAnswer(this.answers[index].id);
				this.getTasksAnswer();
				return;
			}
			if (this.answers.length > 1) {
				this.answers.splice(index, 1);
			} else {
				this.$store.toast(
					'danger',
					'Pytanie musi zawierać co najmniej jedną odpowiedź.',
				);
			}
		},
		getAnswers(){
			return this.answers;
		}
	},
};
</script>

<style scoped></style>
