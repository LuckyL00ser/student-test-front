<template>
	<div>
		<h1>Szczegóły przedmiotu - {{ form.name }}</h1>
		<p>Testy dla przedmiotu:</p>
		<router-link
				:to="{ name: 'AddTest' }"
		>Dodaj test</router-link>
		<TestsList :data="tests">
			<template v-slot:actions="{ data }">
				<template v-if="$store.getters.userRole == 'TEACHER_ROLE'">
					<router-link
							:to="{ name: 'EditTest', params: { testID: data.item.id } }"
					>Edytuj
					</router-link>
					<b-btn @click="deleteTest(data.item.id)">Usuń</b-btn>
				</template>
				<template v-if="$store.getters.userRole == 'USER_ROLE'">
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
import * as subjectAPI from '@/api/subjectAPI';
import { deleteTest, getTestsBySubject } from '../../api/testAPI';
import TestsList from '../../components/Tests/TestsList';

export default {
	name: 'SubjectDetails',
	components: { TestsList },
	props: ['subjectID'],
	data() {
		return {
			loading: false,
			form: {},
			tests: []
		};
	},
	mounted() {
		this.getSubject();
	},
	methods: {
		async getSubject() {
			this.loading = true;
			try {
				const response = await subjectAPI.getSubject(
					this.$route.params.subjectID,
				);
				this.form = response.data;
			} catch (e) {
				this.$store.toast('error', e);
			}
			this.loading = false;
		},
		async getTests() {
			this.loading = true;
			try {
				let response = getTestsBySubject(this.$route.params.subjectID)
				this.tests = response.data;
			} catch (e) {
				this.$store.toast('error', e);
			}
			this.loading = false;
		},
		async deleteTest(id) {
			this.loading = true;
			try {
				await deleteTest(id);
				this.$store.toast('info','Usunięto');
				this.getTests();
			} catch (e) {
				this.$store.toast('error', e);
			}
			this.loading = false;
		},
	},
};
</script>

<style scoped></style>
