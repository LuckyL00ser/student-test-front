<template>
	<b-container fluid>
		<b-row class="mt-2">
			<b-col lg="12">
				<b-button class="btn btn-success float-right" @click="addQuestion()">
					Dodaj odpowiedź
				</b-button>
			</b-col>
		</b-row>
		<b-row v-for="(item, index) in answer" :key="index" class="mt-2">
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
				<b-checkbox
					:id="'box-' + index"
					v-model="correct[index]"
					class="text-nowrap"
					size="lg"
					@change="validate(index)"
				/>
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
	name: 'SingleChoiceQuestion',
	props: ['TaskId'],
	data: function() {
		return {
			answer: [''],
			correct: [false],
		};
	},
	created() {
		const response = this.getTasksAnswer();
		if (response.length > 0) {
			for (let i = 0; i < response.length; i++) {
				this.answer[i] = response.answer[i];
				this.correct[i] = response.correct[i];
			}
		}
	},
	methods: {
		async getTasksAnswer() {
			return await AnswerAPI.getAnswersByTaskId(this.TaskId);
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

		validate(index) {
			var checkBox = document.getElementById('box-' + index);
			var items = document.querySelectorAll(
				"div.container-fluid input[type='checkbox']",
			);
			items.forEach((element, i) => {
				if (element !== checkBox) this.correct[i] = false;
			});
		}
	},
};
</script>

<style scoped></style>
