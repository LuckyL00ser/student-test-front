<template>
	<b-table
		striped
		responsive="true"
		hover
		:items="questions"
		:fields="fields"
		:busy="loading"
	>
		<template v-slot:cell(actions)="data">
			<router-link
				:to="{ name: 'EditQuestion', params: { questionID: data.item.id } }"
				>Edytuj</router-link
			>
			<b-btn @click="deleteQuestion(data.item.id)">Usuń</b-btn>
		</template>
		<template v-slot:table-busy>
			<Loader :loading="loading" />
		</template>
	</b-table>
</template>

<script>
import Loader from '../common/Loader';
import * as questionAPI from '@/api/taskAPI';

export default {
	name: 'QuestionsList',
	components: { Loader },
	props: ['questions', 'loading', 'isTestRated'],
	data() {
		return {
			questionTypes: {
				MultipleChoiceQuestion: 'wielokrotnego wyboru',
				SingleChoiceQuestion: 'jednokrotnego wyboru',
				TextQuestion: 'opisowe',
			},
			fields: [
				{
					label: 'Pytanie',
					key: 'question',
					sortable: true,
				},
				{
					label: 'Rodzaj pytania',
					key: 'type',
					formatter: question => this.questionTypes[question],
					sortable: true,
				},
				{
					label: 'Liczba punktow',
					key: 'points',
				},
				this.isTestRated
					? {
							label: 'Zdobyte punkty',
							key: 'score',
					  }
					: {
							label: 'Akcje',
							key: 'actions',
					  },
			],
		};
	},
	methods: {
		async deleteQuestion(id) {
			try {
				 await questionAPI.deleteTask(id);
				this.$store.toast('success', 'Usunięto pytanie');
				this.$emit('questionDeleted', id);
			} catch (e) {
				this.$store.toast('danger', 'Niepowodzenie ususwania pyatania' + e);
			}
		},
	},
};
</script>

<style scoped></style>
