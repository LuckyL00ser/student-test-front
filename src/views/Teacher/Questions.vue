<template>
	<div>
		lista pytan
		<QuestionsList :questions="exampleQuestions" />
	</div>
</template>

<script>
import QuestionsList from '@/components/Questions/QuestionsList';
export default {
	name: 'Questions',
	components: { QuestionsList },
	data() {
		return {
			exampleQuestions: [
				{
					id: 1,
					name: 'Pytanie 1',
					type: 'jednokrotnego',
					points: '2',
				},
				{
					id: 2,
					name: 'Pytanie 2',
					type: 'wielokrotnego',
					points: '3',
				},
				{
					id: 3,
					name: 'Pytanie3',
					type: 'otwarte',
					points: '4',
				},
			],
		};
	},
};
</script>

<style scoped></style>
