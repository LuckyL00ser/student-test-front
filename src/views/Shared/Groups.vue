<template>
	<div>
		<div class="d-flex align-items-center justify-content-between mt-5">
			<h3 >{{ title }}</h3>
			<router-link tag="button" class="btn rounded-0 shadow   btn-outline-success" v-if="$store.getters.userRole == 'ROLE_TEACHER'" :to="{ name: 'AddGroup' }">
				Dodaj grupę
			</router-link>
		</div>
		<SubjectsList :data="subjects">
			<template v-slot:actions="{ data }">
				<router-link
					:to="{ name: 'GroupDetails', params: { groupID: data.item.id } }"
				>
					Szczegóły
				</router-link>
				<template v-if="$store.getters.userRole == 'ROLE_TEACHER'">
					<router-link
						:to="{ name: 'EditGroup', params: { groupID: data.item.id } }"
						>Edytuj
					</router-link>
					<b-btn variant="danger" @click="deleteGroup(data.item.id)"
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
	deleteGroup,
	getAllGroups,
	getStudentGroups,
	getTeacherGroups,
} from '../../api/groupAPI';

export default {
	name: 'Groups',
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
				if (this.$route.name == 'StudentGropus')
					response = await getStudentGroups(this.$store.state.user.id);
				else if (this.$route.name == 'TeacherGroups')
					response = await getTeacherGroups(this.$store.state.user.id);
				else response = await getAllGroups();

				this.subjects = response.data;
			} catch (e) {
				this.$store.toast('error', e);
			}
			this.loading = false;
		},
		async deleteGroup(id) {
			this.loading = true;
			try {
				await deleteGroup(id);
				this.$store.toast('info', 'Usunięto');
				this.getSubjects();
			} catch (e) {
				this.$store.toast('error', e);
			}
			this.loading = false;
		},
	},
	computed: {
		title() {
			switch (this.$route.name) {
				case 'StudentGropus':
					return 'Moje grupy';
				case 'TeacherGroups':
					return 'Grupy wykładowcy';
				case 'Groups':
					return 'Wszystkie grupy';
				default:
					return null;
			}
		},
	},
};
</script>

<style scoped></style>
