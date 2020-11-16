<template>
	<b-container fluid>
		<b-form @submit.prevent="submit">
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
						v-model="task.type"
						:options="options"
						v-if="!TaskId"
					>
					</b-form-select>
				</b-col>
				<b-col>
					<SingleChoiceQuestion
						:TaskId="TaskId"
						v-if="task.type == 'SingleChoiceQuestion'"
						v-model="answerList"
					/>
					<MultipleChoiceQuestion
						:TaskId="TaskId"
						v-if="task.type == 'MultipleChoiceQuestion'"
						v-model="answerList"
					/>
				</b-col>
				<b-col>
					<b-button
						class="mt-2"
						variant="success"
						type="submit"
						v-if="task.type"
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
import { createTask, updateTask } from '../api/taskAPI';


export default {
	name: 'Task',
	props: ['TaskId', 'testID'],
	components: {
		SingleChoiceQuestion,
		MultipleChoiceQuestion,
	},
	data: function() {
		return {
			task: {
				image: '',
				points: 0,
				question: '',
				testId: 0,
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
			answerList: [],
		};
	},
	created() {
		if (this.TaskId != null) {
			this.getTask();
		}
		if (this.testID) {
			this.task.testId = this.testID;
		}
	},
	methods: {
		async getTask() {
			const response = await TaskAPI.getTask(this.TaskId);
			this.task = response.data;
		},
		async submit() {
			try {
				if (this.TaskId) { //update
					await updateTask(this.task.id, this.data.task);
					this.$store.toast('info', 'Edytowano pytanie');
					this.$route.push({ route:'EditTest', params: { testID: this.testID }})
				} else { //create
					this.task.answerList = this.answerList;
					await createTask(this.task);
					//TODO: await create all answers
					this.$store.toast('success', 'Dodano nowe pytanie');
					this.$route.push({route:'EditTest', params: {testID: this.testID}})
				}
			}
			catch (e) {
				this.$store.toast('error', e);
			}
		}
	},
};
</script>
