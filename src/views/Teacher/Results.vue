<template>
	<div>
		<h2>Wyniki</h2>
		<div class="d-flex flex-column mb-4">
			Dla przedmiotu:
			<b-checkbox class=" ml-4" v-model="all">pokaż wszystkie</b-checkbox>
			<SubjectSelector class=" ml-4 col-6" v-model="selectedSubjectId" :disabled="all" @subjectIDs="assignTeacherSubjects"/>
		</div>
		<div class="my-3" v-if="!all && selectedSubjectId">
			<b-btn class="mr-2" @click="getExcel(selectedSubjectId)">Pobierz wyniki w Excelu</b-btn>
			<b-btn class="mr-2" variant="success" @click="getPDF(selectedSubjectId)">Pobierz wyniki w PDF</b-btn>
			<b-btn variant="info" @click="getDOCX(selectedSubjectId)">Pobierz wyniki w DOCX</b-btn>
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
import {getExcel,getPDF,getDOCX} from '../../api/resultAPI';

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
		getExcel: getExcel,
		getPDF: getPDF,
		getDOCX: getDOCX,
		async getResults() {
			this.loading = true;
			try {
				const results = await getAllResults(this.$store.state.user.id);
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
