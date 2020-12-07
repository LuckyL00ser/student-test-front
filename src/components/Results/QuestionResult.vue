<template>
	<div>
		<div class="mb-2 w-100">
			<div class="h-100 d-flex flex-column">
				<div class="d-flex justify-content-between align-items-center w-100">
					<h4>{{ questionResult.taskDTO.question }}</h4>
					<b
						>max.
						{{
							questionResult.taskDTO.points
						}}
						pkt</b
					>
				</div>
				<b-row class="flex-grow-1">
					<b-col
						class="col-12 col-md-6 col-lg-4 h-100"
						v-if="questionResult.taskDTO.image"
					>
						<img :src="questionResult.taskDTO.image" alt="obrazek pytanie" />
					</b-col>
					<b-col class="col-12 col-lg-6  h-100 pb-2">
						<ul v-if="questionResult.taskDTO.type != 'TextQuestion'">
							<li
								v-for="(answer) in questionResult.taskDTO.answerList"
								:key="answer.id"
                                :class="(!!questionResult.chosenAnswers.find(x=>x.answerByAnswerId.id==answer.id && answer.correct ))  ?'correct':'incorrect'"
							>

								<b-radio
									disabled
									:value="answer.id"
									v-model="chosenAnswer.answerByAnswerId.id"
									v-if="
										questionResult.taskDTO.type == 'SingleChoiceQuestion'
									"
									>{{ answer.answer }}
								</b-radio>
								<b-checkbox
									disabled
                                    :checked="!!questionResult.chosenAnswers.find(x=>x.answerByAnswerId.id==answer.id)"
									v-else-if="
										questionResult.taskDTO.type ==
											'MultipleChoiceQuestion'
									"
									>{{ answer.answer }}</b-checkbox
								>
							</li>
						</ul>
						<div v-else>
							<b-textarea
								class="h-100"
								disabled
								v-model="questionResult.chosenAnswers[0].descriptedAnswer"
								placeholder="Odpowiedź opisowa"
							></b-textarea>
							<div class="d-flex align-items-center my-2" v-if="!sent && !disabled">
								Punkty:
								<b-spinbutton

									v-model="points"
									min="0"
									class="mx-2 "
									:max="
																		questionResult.chosenAnswers[0]
																			.generateTasksByGenerateTaskId.tasksByTaskId.points
																	"
								></b-spinbutton>

								<b-btn
									:disabled="loading"
									variant="success"
									@click="postPoints(points)"
									>Oceń</b-btn
								>
							</div>
						</div>
					</b-col>
				</b-row>
			</div>
		</div>
	</div>
</template>

<script>
import { axios } from '@/helpers/axiosConfig';
export default {
	name: 'QuestionResult',
	props: ['questionResult', 'resultId','disabled'],
	data() {
		return {
			points: 0,
			loading: false,
			sent: false,
			chosenAnswer: this.questionResult.chosenAnswers.length ? this.questionResult.chosenAnswers[0] : {
				answerByAnswerId: {
					id: false
				},
				generateTasksByGenerateTaskId: {
					tasksByTaskId: {points: 0}
				}

			},
		};
	},
	methods: {
		async postPoints(points) {
			this.loading = true;
			try {
				await axios.post(
					`/result/points?points=${points}&resultId=${this.resultId}`,
					points,
				);
				this.$store.toast('success', 'Dodano punkty');
				this.sent = true;
			} catch (e) {
				this.$store.toast('error', e);
			}
			this.loading = false;
		},
	},
};
</script>

<style >
ul {
	list-style: none;
}


.correct label{
	color: green !important;
}

	.incorrect label{
		color: darkred !important;
	}
</style>
