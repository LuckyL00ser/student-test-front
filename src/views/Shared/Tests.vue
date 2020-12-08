<template>
	<div>
		<h2>{{ title }}</h2>
		<router-link
			v-if="$store.state.user.role == 'teacher'"
			tag="button"
			class="btn-primary rounded"
			:to="{ name: 'AddTest' }"
		>
			Stwórz nowy
		</router-link>
		<div class="d-flex flex-column mb-4" v-if="$store.getters.userRole == 'ROLE_TEACHER'">Dla przedmiotu:
			<b-checkbox class=" ml-4" v-model="all">pokaż wszystkie</b-checkbox>
			<SubjectSelector class="ml-4 col-6" v-model="selectedSubjectId" :disabled="all" @subjectIDs="assignTeacherSubjects"/>
		</div>
		<TestsList :data="filtered" :loading="loading">
			<template v-slot:actions="{ data }">
				<template v-if="$store.getters.userRole == 'ROLE_TEACHER'">
					<router-link
						:to="{ name: 'EditTest', params: { testID: data.item.id } }"
						>Edytuj
					</router-link>
					<b-btn @click.prevent="deleteTest(data.item.id)">Usuń</b-btn>
				</template>
				<template v-else>
<!--					-if="new Date(data.item.date) < new Date()"-->
					<router-link
						:to="{ name: 'FillTest', params: { testID: data.item.id } }"
						>Zacznij wypelniac</router-link
					>
				</template>
			</template>
		</TestsList>
	</div>
</template>

<script>
import TestsList from '../../components/Tests/TestsList';
import { deleteTest, getAllTests } from '../../api/testAPI';
import SubjectSelector from '../../components/Subjects/SubjectSelector';
export default {
	name: 'Tests',
	components: { SubjectSelector, TestsList },
	data() {
		return {
			exampleTests: [],
			loading: false,
			teacherSubjects: [],
			all: true,
			selectedSubjectId: null
		};
	},
	mounted() {
		this.getTests();
	},
	computed: {
		title() {
			return this.$store.getters.userRole == 'ROLE_TEACHER'
				? 'Zarządzaj swoimi testami'
				: 'Wybierz test który chcesz wypełnić';
		},
		filtered (){
			if(this.$store.getters.userRole=='ROLE_TEACHER'){
				if(this.all)
					return this.exampleTests.filter(x=>this.teacherSubjects.includes(x.subject.id))
				else
					return this.exampleTests.filter(x=>this.selectedSubjectId == x.subject.id)
			}
			else
				return this.exampleTests;
		}
	},
	methods: {
		async getTests() {
			this.loading = true;
			try {
				const response = await getAllTests();
				this.exampleTests = response.data;
			} catch (e) {
				this.$store.toast('danger', 'Niepowodzenie pobierania testów' + e);
			}
			this.loading = false;
		},
		async deleteTest(id) {
			try {
				await deleteTest(id);
				this.getTests();
				this.$store.toast('success', 'Usunięto test');
				this.$emit('testDeleted', id);
			} catch (e) {
				this.$store.toast('danger', 'Niepowodzenie ususwania testu' + e);
			}
		},
		assignTeacherSubjects(e){
			this.teacherSubjects = e;
		}
	},
};
</script>

<style scoped></style>
