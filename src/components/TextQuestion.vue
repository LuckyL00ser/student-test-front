<template>
	<b-container fluid>
		<b-row class="mt-2">
			<b-form-input
				id="txt-question"
				class="col-lg-12"
				v-model="answer"
				placeholder="Odpowiedź..."
			/>
		</b-row>
	</b-container>
</template>

<script>
import * as TaskAPI from '@/api/taskAPI';

export default {
	name: 'TextQuestion',
	props: ['TaskId'],
	data: function() {
		return {
			answer: '',
		};
	},
	created() {
		// if(this.TaskId != null)
		// {
		//     const response = this.getTasksAnswers();
		// }
	},
	methods: {
		async getTasksAnswers() {
			return await TaskAPI.getTask(this.TaskId);
		},
	},
};
</script>
