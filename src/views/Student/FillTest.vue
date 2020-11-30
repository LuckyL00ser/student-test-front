<template>
	<b-card class="shadow overflow-hidden mb-3 ">
		<div class="d-flex flex-column h-100">
			<div class="d-flex justify-content-between align-items-center w-100">
				<h2>Wypełnianie testu - {{ test.name }}</h2>
				<div>
					Pozostały czas: <b>{{ parseInt(timeLeft / 60) }}</b> min
					<b>{{ timeLeft % 60 }}</b> sekund
				</div>
			</div>
			<p
				v-if="currentQuestion != questions.length"
				class="d-flex justify-content-between align-items-center w-100"
			>
				<span>Pytanie {{ currentQuestion + 1 }}/{{ questions.length }}</span>
				<span v-if="questions.length"
					>Punkty za to pytanie:
					<b>{{ questions[currentQuestion].points }} </b></span
				>
			</p>
			<transition-group
				name="slide"
				mode="in-out"
				tag="div"
				class="h-100 d-flex"
			>
				<div
					class="mb-2 w-100"
					v-for="(question, index) in questions"
					:key="question.id"
					v-show="index === currentQuestion"
				>
					<div class="h-100 d-flex flex-column">
						<div
							class="d-flex justify-content-between align-items-center w-100"
						>
							<h4>{{ question.question }}</h4>
						</div>
						<b-row class="flex-grow-1">
							<b-col
								class="col-12 col-md-6 col-lg-4 h-100"
								v-if="question.image"
							>
								<img :src="question.image" alt="obrazek pytanie" />
							</b-col>
							<b-col class="col-12 col-lg-6  h-100 pb-2">
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
								<b-textarea
									class="h-100"
									v-else
									placeholder="Odpowiedź opisowa"
									v-model="question.answerList[0].answer"
								></b-textarea>
							</b-col>
						</b-row>
					</div>
				</div>
			</transition-group>
			<b-btn
				class="btn-success"
				v-if="currentQuestion != questions.length"
				@click="currentQuestion++"
				>Kolejne pytanie</b-btn
			>
			<b-btn class="btn-success" v-else-if="!testSent" @click="sendTest"
				>Prześlij odpowiedzi</b-btn
			>
			<h3 class="text-success text-center my-5" v-else>Test zakończony</h3>
		</div>
	</b-card>
</template>

<script>
import { createGenerateTest } from '../../api/generateTestAPI';
import { getTest } from '../../api/testAPI';
import { sendTestAnswers } from '../../api/resultAPI';

export default {
	name: 'FillTest',
	data() {
		return {
			questions: {},
			test: {},
			timeLeft: 0,
			currentQuestion: 0,
			timer: null,
			testSent: false,
		};
	},
	async mounted() {
		try {
			const [questions, test] = await Promise.all([
				createGenerateTest(this.$route.params.testID),
				getTest(this.$route.params.testID),
			]);
			this.questions = questions.data.map(x => {
				if (x.type !== 'TextQuestion') return x;
				return {
					...x,
					answerList: [
						{
							answer: '',
							correct: true,
							taskId:x.id,
							id:null
						},
					],
				};
			});
			this.test = test.data;
			this.timeLeft = this.test.time * 60;
			this.calcTime();
		} catch (e) {
			this.$store.toast('danger', 'Błąd podczas generowania testu');
		}
	},
	methods: {
		calcTime() {
			this.timer = setInterval(() => {
				this.timeLeft--;
				if (this.timeLeft === 0) {
					this.$store.toast('info', 'Koniec czasu test wysłany');
					this.sendTest();
				}
			}, 1000);
		},
		async sendTest() {
			this.currentQuestion = this.questions.length;
			clearInterval(this.timer);
			this.testSent = true;
			try {
				await sendTestAnswers(
					JSON.stringify(
						this.questions.reduce(
							(acc, item) => [...acc, ...item.answerList],
							[],
						),
					),
					this.questions[0].testId,
					this.$store.state.user.id,
				);
			} catch (e) {
				this.$store.toast('danger', 'Błąd podczas generowania testu');
			}
		},
	},
};
</script>

<style scoped>
.slide-leave-active,
.slide-enter-active {
	transition: 0.5s;
}
.slide-enter {
	transform: translate(100%, 0);
}
.slide-leave-to {
	transform: translate(-100%, 0);
}
.shadow {
	height: 500px;
}
ul {
	list-style: none;
	padding-left: 0;
}
img {
	max-height: 280px;
}
</style>
