<template>
	<b-card class="shadow overflow-hidden">
		<div class="d-flex justify-content-between align-items-center w-100">
			<h2>Wypełnianie testu - {{ test.name }}</h2>
			<div>Pozostały czas: <b>{{ parseInt(timeLeft/60) }}</b> min <b>{{timeLeft%60}}</b> sekund</div>
		</div>
		<p v-if="currentQuestion!=questions.length">Pytanie {{currentQuestion+1}}/{{questions.length}}</p>
		<transition-group  name="slide">
			<div
					v-for="(question, index) in questions"
					:key="question.id"
					v-show="index == currentQuestion"
			>
				<div class="d-flex justify-content-between align-items-center w-100">
					<h4>{{ question.question }}</h4>
					<span>Punkty za to pytanie: <b>{{ question.points }} </b></span>
				</div>
				<b-row>
					<b-col class="col-12 col-md-6 col-lg-4" v-if="question.image">
						<img :src="question.image" class="w-100" alt="obrazek pytanie" />
					</b-col>
					<b-col class="col-12 col-lg-6">
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
		</transition-group>
		<b-btn
			class="btn-success"
			v-if="currentQuestion != questions.length"
			@click="currentQuestion++"
			>Kolejne pytanie</b-btn
		>
		<b-btn class="btn-success" v-else-if="!testSent" @click="sendTest">Prześlij odpowiedzi</b-btn>
		<h3 class="text-success text-center my-5" v-else>Test zakończony</h3>
	</b-card>
</template>

<script>
import { createGenerateTest } from '../../api/generateTestAPI';
import { getTest } from '../../api/testAPI';
import { getResultByUserIdAndGeneraTestIdAndAnswerList } from '../../api/resultAPI';

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
			this.questions = questions.data;
			this.test = test.data;
			this.timeLeft = this.test.time*60;
			this.calcTime();
		} catch (e) {
			this.$store.toast('danger', 'Błąd podczas generowania testu');
		}
	},
	methods: {
		calcTime() {
			this.timer = setInterval(()=>{
				this.timeLeft--;
				if(this.timeLeft === 0){
					this.$store.toast('info','Koniec czasu test wysłany');
					this.sendTest();
				}
			},1000);
		},
		async sendTest(){
			this.currentQuestion = this.questions.length
			clearInterval(this.timer);
			this.testSent = true;
			try {
				await getResultByUserIdAndGeneraTestIdAndAnswerList(JSON.stringify(this.questions),this.questions[0].testId,this.$store.state.user.id);
			} catch (e) {
				this.$store.toast('danger', 'Błąd podczas generowania testu');
			}
		}
	},
};
</script>

<style scoped>
	.slide-leave-active,
	.slide-enter-active {
		transition: 1s;
	}
	.slide-enter {
		transform: translate(100%, 0);
	}
	.slide-leave-to {
		transform: translate(-100%, 0);
	}
</style>
