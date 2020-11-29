<template>
	<div>
		<h2>Wyniki</h2>
		<div class="d-flex align-items-center">Dla przedmiotu:
			<b-checkbox class=" mx-2" v-model="all">pokaż wszystkie</b-checkbox>
			<SubjectSelector class="col-6" v-model="selectedSubjectId" :disabled="all" @subjectIDs="assignTeacherSubjects"/>
		</div>
		<b-radio  value="all" v-model="onlyMarked">Wszystkie</b-radio>
		<b-radio  value="marked_only" v-model="onlyMarked">Tylko ocenione</b-radio>
		<b-radio  value="unmarked_only" v-model="onlyMarked">Tylko nieocenione</b-radio>
		<ResultsList :results="filtered" :loading="loading"/>
	</div>
</template>

<script>
import { getAllResults } from '../../api/resultAPI';
import ResultsList from '../../components/Results/ResultsList';
import SubjectSelector from '../../components/Subjects/SubjectSelector';

export default {
	name: 'Results',
	components: { SubjectSelector, ResultsList },
	data(){
		return {
			loading: true,
			results: [],
			teacherSubjects: [],
			selectedSubjectId: null,
			all: true,
			onlyMarked: 'all'
		}
	},
	mounted() {
		this.getResults()
	},
	computed: {
		filtered(){
			let list = [];
			if(this.all)
				list = this.results.filter(x=>this.teacherSubjects.includes(x.generateTest.test.subject.id))
			else
				list = this.results.filter(x=>this.selectedSubjectId == x.generateTest.test.subject.id)

			if(this.onlyMarked === 'marked_only')
				list = list.filter(x=>x.mark)
			else if(this.onlyMarked == 'unmarked_only')
				list = list.filter(x=>!x.mark)

			return list;
		}
	},
	methods:{
		async getResults() {
			this.loading = true;
			try {
				const results = await getAllResults(this.$store.state.user.id)
				this.results = results.data;
			} catch (e) {
				this.$store.toast('error', e);
			}
			this.loading = false;
		},
		assignTeacherSubjects(e){
			this.teacherSubjects = e;
		}
	}
};
</script>

<style scoped></style>
