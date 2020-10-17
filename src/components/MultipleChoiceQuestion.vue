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
          class="col-12"
        />
      </b-col>
      <b-col sm="2">
        <b-button class="btn btn-success float-right" @click="addQuestion()">
          Dodaj odpowiedź
        </b-button>
      </b-col>
    </b-row>
    <b-row class="mt-2" v-for="(answer, index) in answers" :key="index">
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
          v-model="answers[index]"
          class="col-12"
        />
      </b-col>
      <b-col sm="1">
        <b-checkbox v-model="isCorrect[index]" class="text-nowrap" size="lg" />
      </b-col>
      <b-col sm="1">
        <b-button class="btn btn-danger btn-sm" @click="deleteQuestion(index)">
          X
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "MultipleChoiceQuestion",
  data: function() {
    return {
      question: "",
      answers: [""],
      isCorrect: [false]
    };
  },
  methods: {
    addQuestion() {
      this.answers.push("");
      this.isCorrect.push(false);
    },

    deleteQuestion(index) {
      if (this.answers.length > 1) {
        this.answers.splice(index, 1);
        this.isCorrect.splice(index, 1);
      } else {
        alert("Pytanie musi zawierać co najmniej jedną odpowiedź.");
      }
    }
  }
};
</script>

<style scoped></style>
