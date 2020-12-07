<template>
	<div>
		<div class="d-flex align-items-center justify-content-between mt-5">
			<h3>{{ title }}</h3>
			<router-link
				tag="button"
				class="btn rounded-0 shadow   btn-outline-success"
				v-if="$store.getters.userRole == 'ROLE_TEACHER'"
				:to="{ name: 'AddSubject' }"
			>
				Dodaj przedmiot
			</router-link>
		</div>
		<SubjectsList :data="subjects" :loading="loading">
			<template v-slot:actions="{ data }">
				<router-link
					:to="{ name: 'SubjectDetails', params: { subjectID: data.item.id } }"
				>
					Szczegóły
				</router-link>
				<template v-if="$store.getters.userRole == 'ROLE_TEACHER'">
					<router-link
						:to="{ name: 'EditSubject', params: { subjectID: data.item.id } }"
						>Edytuj
					</router-link>
					<b-btn variant="danger" @click="deleteSubject(data.item.id)"
						>Usuń</b-btn
					>
				</template>
			</template>
		</SubjectsList>
	</div>
</template>

<script>
import SubjectsList from '../../components/Subjects/SubjectsList';
import {
	deleteSubject,
	getAllSubjects,
	getStudentSubjects,
	getTeacherSubjects,
} from '../../api/subjectAPI';
export default {
	name: 'Subjects',
	components: { SubjectsList },
	data() {
		return {
			subjects: [],
			loading: true,
			extraFields: {},
		};
	},
	mounted() {
		this.getSubjects();
	},
	methods: {
		async getSubjects() {
			this.loading = true;
			try {
				let response = null;
				if (this.$route.name == 'StudentSubjects')
					response = await getStudentSubjects(this.$store.state.user.id);
				else if (this.$route.name == 'TeacherSubjects')
				{
					response = await getTeacherSubjects(this.$store.state.user.id);
					console.log(response);
				}
				else response = await getAllSubjects();

				this.subjects = response.data;
			} catch (e) {
				this.$store.toast('danger', e);
			}
			this.loading = false;
		},
		async deleteSubject(id) {
			this.loading = true;
			try {
				await deleteSubject(id);
				this.$store.toast('info', 'Usunięto');
				this.getSubjects();
			} catch (e) {
				this.$store.toast('danger', e);
			}
			this.loading = false;
		},
	},
	computed: {
		title() {
			switch (this.$route.name) {
				case 'StudentSubjects':
					return 'Moje przedmioty';
				case 'TeacherSubjects':
					return 'Przedmioty wykładowcy';
				case 'Subjects':
					return 'Wszystkie przedmioty';
				default:
					return null;
			}
		},
	},
};
</script>

<style scoped></style>
