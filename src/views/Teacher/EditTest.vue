<template>
	<div>
		<div>edytuj test ID: {{ $route.params.testID }}</div>
		<TestForm :test-i-d="$route.params.testID"/>
		Pula pytań:
		<QuestionsList :questions="questions" />
		<router-link :to="{name: 'AddQuestion', params: {}}">
			Dodaj pytanie
		</router-link>
	</div>
</template>

<script>
import TestForm from '../../components/Tests/TestForm';
import QuestionsList from '@/components/Questions/QuestionsList';

export default {
	name: 'EditTest',
	components: { TestForm,QuestionsList },
	data() {
		return {
			questions: [
				{
					id: 1,
					name: 'Pytanie 1',
					type: 'jednokrotnego',
					points: '2',
				},
			],
		};
	},
};
</script>

<style scoped></style>
