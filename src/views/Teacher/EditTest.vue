<template>
	<div>
		<h2>Edycja testu</h2>
		<TestForm :test-i-d="$route.params.testID"/>
		<hr>
		<div class="d-flex align-items-center justify-content-between mt-5">
			<h3 >Pula pytań:</h3>
			<router-link tag="button" class="btn rounded-0 shadow   btn-outline-success" :to="{name: 'AddQuestion', params: {}}">
				Dodaj pytanie
			</router-link>
		</div>
		<QuestionsList :questions="questions" @questionDeleted="getQuestions"/>

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
