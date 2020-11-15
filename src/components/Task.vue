<template>
	<b-container fluid>
		<b-form>
			<b-form-group>
				<b-col>
					<b-form-input
						id="txt-question"
						class="col-lg-12"
						v-model="task.question"
						placeholder="Pytanie..."
					/>
				</b-col>
				<b-col>
					<b-form-select
						class="mt-2"
						v-model="selectedQuestionType"
						:options="options"
						v-if="!selectedQuestionType"
					>
					</b-form-select>
				</b-col>
				<b-col>
					<SingleChoiceQuestion
						v-if="selectedQuestionType == 'SingleChoiceQuestion'"
					/>
					<MultipleChoiceQuestion
						:TaskId="this.TaskId"
						v-if="selectedQuestionType == 'MultipleChoiceQuestion'"
					/>
					<TextQuestion
						:TaskId="this.TaskId"
						v-if="selectedQuestionType == 'TextQuestion'"
					/>
				</b-col>
				<b-col>
					<b-button
						class="mt-2"
						variant="success"
						type="submit"
						v-if="selectedQuestionType"
					>
						Zapisz
					</b-button>
				</b-col>
			</b-form-group>
		</b-form>
	</b-container>
</template>

<script>
import * as TaskAPI from '@/api/taskAPI';
import SingleChoiceQuestion from '@/components/SingleChoiceQuestion.vue';
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion.vue';
import TextQuestion from '@/components/TextQuestion.vue';

export default {
	name: 'Task',
	props: ['TaskId'],
	components: {
		SingleChoiceQuestion,
		MultipleChoiceQuestion,
		TextQuestion,
	},
	data: function() {
		return {
			task: {
				id: 0,
				image: '',
				points: 0,
				question: '',
				testByTestId: {
					date: Date.now(),
					fullPoints: 0,
					id: 0,
					name: '',
					subjectBySubjectId: {
						id: 0,
						name: '',
					},
					time: 0,
				},
				type: '',
			},
			options: [
				{
					value: 'MultipleChoiceQuestion',
					text: 'Pytanie wielokrotnego wyboru',
				},
				{
					value: 'SingleChoiceQuestion',
					text: 'Pytanie jednokrotnego wyboru',
				},
				{
					value: 'TextQuestion',
					text: 'Pytanie opisowe',
				},
			],
			selectedQuestionType: null,
		};
	},
	created() {
		if (this.TaskId != null) {
			const task = this.getTask();
			this.data.task = task;
		}
	},
	methods: {
		async getTask() {
			const response = await TaskAPI.getTask(this.TaskId);
			return response;
		},
	},
};
</script>
