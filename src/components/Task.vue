<template>
	<b-container fluid>
		<b-form @submit.prevent="submit">
			<b-row>
				<b-col class="col-8">
					<b-form-group label="Rodzaj pytania" class="mb-5">
						<b-form-select
							class="mt-2"
							v-model="task.type"
							:options="options"
							:disabled="!!taskId"
						>
						</b-form-select>
					</b-form-group>
					<b-row>
						<b-col>
							<b-form-group label="Pytanie">
								<b-form-input
									id="txt-question"
									class="col-lg-12"
									v-model="task.question"
									placeholder="Pytanie..."
								/>
							</b-form-group>
						</b-col>
						<b-col>
							<b-form-group label="Ilość punktów">
								<b-spinbutton v-model="task.points" min="1"></b-spinbutton>
							</b-form-group>
						</b-col>
					</b-row>
					<b-col>
						<SingleChoiceQuestion
							:task-id="taskId"
							v-if="task.type == 'SingleChoiceQuestion'"
							ref="single"
						/>
						<MultipleChoiceQuestion
							:task-id="taskId"
							v-if="task.type == 'MultipleChoiceQuestion'"
							ref="multiple"
						/>
					</b-col>
				</b-col>
				<b-col class="col-4">
					<b-form-group label="Obrazek" class=" w-100">
						<b-col class="w-100">
							<b-form-input
								id="txt-question"
								class="row w-100 mt-2 mb-5"
								v-model="task.image"
								placeholder="URL obrazka"
							/>
							<img
								class="row w-100"
								v-if="task.image"
								:src="task.image"
								alt="obrazek do pytania"
							/>
						</b-col>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
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
			</b-row>
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
	props: ['taskId', 'testID'],
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
			answerList: [],
		};
	},
	mounted() {
		if (this.taskId != null) {
			this.getTask();
		}
		if (this.testID) {
			this.task.testId = this.testID;
		}
	},
	methods: {
		async getTask() {
			const response = await TaskAPI.getTask(this.taskId);
			this.task = response.data;
			this.task.testId = this.testID;
		},
		readAnswers() {
			switch (this.task.type) {
				case 'MultipleChoiceQuestion':
					this.task.answerList = this.$refs.multiple.getAnswers();
					break;
				case 'SingleChoiceQuestion':
					this.task.answerList = this.$refs.single.getAnswers();
					break;
				case 'TextQuestion':
					this.task.answerList = [{
						correct: true,
						answer: ''
					}]
					break;
				default:
					this.task.answerList = [];
			}
		},
		async submit() {
			try {
				if (this.taskId) {
					//update
					this.readAnswers();
					await updateTask(this.task.id, this.task);
					this.$store.toast('info', 'Zapisano zmiany');
					this.$router.push({
						name: 'EditTest',
						params: { testID: this.testID },
					});
				} else {
					//create
					this.readAnswers();
					await createTask(this.task);
					this.$store.toast('success', 'Dodano nowe pytanie');
					this.$router.push({
						name: 'EditTest',
						params: { testID: this.testID },
					});
				}
			} catch (e) {
				this.$store.toast('danger', e);
			}
		},
	},
};
</script>
