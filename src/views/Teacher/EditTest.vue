<template>
	<div>
		<div>edytuj test ID: {{ $route.params.testID }}</div>
		<TestForm :test-i-d="$route.params.testID"/>
		Pula pytań:
		<QuestionsList :questions="questions" @questionDeleted="getQuestions"/>
		<router-link :to="{name: 'AddQuestion', params: {}}">
			Dodaj pytanie
		</router-link>
	</div>
</template>

<script>
import TestForm from '../../components/Tests/TestForm';
import QuestionsList from '@/components/Questions/QuestionsList';
import { getByTestId } from '../../api/taskAPI';

export default {
	name: 'EditTest',
	components: { TestForm,QuestionsList },
	data() {
		return {
			questions: [

			],
		};
	},
	mounted() {
		this.getQuestions();
	},
	methods: {
		async getQuestions(){
			try{
				const response  = await getByTestId(this.$route.params.testID);
				this.questions = response.data;
			}
			catch (e) {
				this.$store.toast('error','Błąd podczas pobierania pytań')
			}
		}
	}
};
</script>

<style scoped></style>
