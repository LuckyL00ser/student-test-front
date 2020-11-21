<template>
	<div>
		<div>Wypełnianie testu {{ test.name }}</div>
		<div>Pozostały czas: {{ timeLeft }}</div>
		<!--		{{answersList}}-->

		<div
			v-for="(question, index) in questions"
			:key="question.id"
			v-show="index == currentQuestion"
		>
			<b>Pytanie: </b>{{ question.question }}<br />
			<b>Punkty do zdobycia: </b>{{ question.points }} <br />
			<b-row>
				<b-col class="col-3" v-if="question.image">
					<img :src="question.image" class="w-100" alt="obrazek pytanie" />
				</b-col>
				<b-col>
					<ul v-if="question.type != 'TextQuestion'">
						<li v-for="answer in question.answerList" :key="answer.id">
							<b-radio
								:name="question.id.toString()"
								v-if="question.type == 'SingleChoiceQuestion'"
								>{{ answer.answer }}</b-radio
							>
							<b-checkbox
								v-else-if="question.type == 'MultipleChoiceQuestion'"
								>{{ answer.answer }}</b-checkbox
							>
						</li>
					</ul>
					<b-textarea v-else placeholder="Odpowiedź opisowa"></b-textarea>
				</b-col>
			</b-row>
		</div>
		<b-btn
			class="btn-success"
			v-if="currentQuestion != questions.length"
			@click="currentQuestion++"
			>Kolejne pytanie</b-btn
		>
		<b-btn class="btn-success" v-else>Zakończ</b-btn>
	</div>
</template>

<script>
import { createGenerateTest } from '../../api/generateTestAPI';
import { getTest } from '../../api/testAPI';

export default {
	name: 'FillTest',
	data() {
		return {
			questions: {},
			test: {},
			timeLeft: 0,
			currentQuestion: 0,
		};
	},
	async mounted() {
		try {
			const [questions, test] = await Promise.all([
				createGenerateTest(this.$route.params.testID),
				getTest(this.$route.params.testID),
			]);
			this.questions = questions.data;
			this.test = test.data;
		} catch (e) {
			this.$store.toast('danger', 'Błąd podczas generowania testu');
		}
	},
	methods: {
		calcTime() {},
	},
};
</script>

<style scoped></style>
