<template>
    <div>
        <div
                class="mb-2 w-100"
                v-for="(question) in questionResult.taskDTO.answerList"
                :key="question.id"
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
                        ></b-textarea>
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'QuestionResult',
      props: ['questionResult']
	};
</script>

<style scoped>

</style>
