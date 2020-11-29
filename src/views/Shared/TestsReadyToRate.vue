<template>
	<div>
		<h2>Wybierz przedmiot</h2>
		<b-form-select class="mb-5" v-model="selected" :options="subjects" v-on:change="getTests()">
		</b-form-select>
		<h2>Testy które wypełniłeś</h2>

		<TestsList :data="tests" :loading="loading">
			<template v-slot:actions="{ data }">
				<template v-if="$store.state.user.role == 'teacher'">
					<router-link
						:to="{ name: 'RateTest', params: { testID: data.item.id } }"
						>Oceń</router-link
					>
				</template>
			</template>
		</TestsList>
	</div>
</template>

<script>
// import { getGenerateTestByUser } from '../../api/generateTestAPI';
import { getTestsByUserAndSubjectId } from '../../api/testAPI';
import { getStudentSubjects, getTeacherSubjects } from '../../api/subjectAPI';
import TestsList from '../../components/Tests/TestsList';

export default {
	name: 'TestsReadyToRate',
	components: { TestsList },
	data() {
		return {
			tests: [],
			loading: false,
			subjects: [],
			selected: null,
		};
	},
	mounted() {
		this.getSubjects();
	},
	methods: {
		async getTests() {
			this.loading = true;
			try {
				let response = await getTestsByUserAndSubjectId(this.$store.state.user.id, this.selected);
				this.tests = response.data;
			} catch (e) {
				this.$store.toast('danger', e);
			}
			this.loading = false;
		},
		async getSubjects() {
			try {
				let response;
				if (this.$store.state.user.role == 'teacher') {
					response = await getTeacherSubjects(this.$store.state.user.id);
				} else {
					response = await getStudentSubjects(this.$store.state.user.id);
				}
				Object.keys(response.data).forEach(key => {
					this.subjects.push({
						value: response.data[key].id,
						text: response.data[key].name,
					});
				});
			} catch (e) {
				this.$store.toast('danger', e);
			}
		}
	},
};
</script>

<style scoped></style>
