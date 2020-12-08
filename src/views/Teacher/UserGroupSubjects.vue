<template>
	<div>
		<h1>Lista studentów powiązanych z przedmiotami</h1>
		<router-link
			v-if="$store.getters.userRole == 'ROLE_TEACHER'"
			tag="button"
			class="btn-primary rounded"
			:to="{ name: 'AddUserGroupSubject' }"
		>
			Przypisz studenta
		</router-link>
		<UserGroupSubjectList :data="userGroupSubjects" :loading="loading">
			<template v-slot:actions="{ data }">
				<b-btn variant="danger" @click="deleteUserGroupSubject(data.item.id)"
					>Usuń</b-btn
				>
			</template>
		</UserGroupSubjectList>
	</div>
</template>

<script>
import UserGroupSubjectList from '../../components/UserGroupSubject/UserGroupSubjectList';
import {
	deleteUserGroupSubject,
	getAllUserGroupSubjects,
} from '../../api/userGroupSubjectAPI';

export default {
	name: 'UserGroupSubjects',
	components: { UserGroupSubjectList },
	data() {
		return {
			userGroupSubjects: [],
			loading: true,
		};
	},
	mounted() {
		this.getUserGroupSubjects();
	},
	methods: {
		async getUserGroupSubjects() {
			this.loading = true;
			try {
				const response = await getAllUserGroupSubjects();
				this.userGroupSubjects = response.data;
			} catch (e) {
				this.$store.toast('danger', e);
			}
			this.loading = false;
		},
		async deleteUserGroupSubject(id) {
			this.loading = true;
			try {
				await deleteUserGroupSubject(id);
				this.$store.toast('info', 'Usunięto');
				this.getUserGroupSubjects();
			} catch (e) {
				this.$store.toast('danger', e);
			}
			this.loading = false;
		},
	},
};
</script>

<style scoped></style>
