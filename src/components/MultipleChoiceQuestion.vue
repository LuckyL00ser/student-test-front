<template>
  <b-container fluid>
    <b-row class="mt-2">
      <b-col sm="2">
        <label for="txt-question" class="float-left">Pytanie:</label>
      </b-col>
      <b-col>
        <input
          id="txt-question"
          placeholder="Pytanie..."
          v-model="question"
          class="col-12 float-left"
        />
      </b-col>
    </b-row>
    <b-row class="mt-2" v-for="(answer, index) in answers" v-bind:key="index">
      <b-col sm="2">
        <label for="txt-answer" class="text-nowrap float-left">
          Odpowiedź {{ index + 1 }}:
        </label>
      </b-col>
      <b-col>
        <input
          id="txt-answer"
          type="text"
          placeholder="Odpowiedź..."
          v-model="answer.answer"
          class="col-12"
        />
      </b-col>
      <b-col sm="1">
        <b-checkbox v-model="answer.isCorrect" class="text-nowrap"></b-checkbox>
      </b-col>
      <b-col sm="1">
        <b-button class="btn btn-danger btn-sm" @click="deleteQuestion(index)">
          X
        </b-button>
      </b-col>
    </b-row>
    <b-button class="btn btn-success mt-3 mb-3" @click="addQuestion()">
      Dodaj odpowiedź
    </b-button>
  </b-container>
</template>

<script>
export default {
  name: "MultipleChoiceQuestion",
  data: function() {
    return {
      question: "",
      answers: [
        {
          answer: "",
          isCorrect: false
        }
      ]
    };
  },
  methods: {
    addQuestion() {
      this.answers.push({
        answer: "",
        isCorrect: false
      });
    },

    deleteQuestion(index) {
      if (this.answers.length > 1) {
        this.answers.splice(index, 1);
      } else {
        alert("Pytanie musi zawierać co najmniej jedną odpowiedź.");
      }
    }
  }
};
</script>

<style scoped></style>
