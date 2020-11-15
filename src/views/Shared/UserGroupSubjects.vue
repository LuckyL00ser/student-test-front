<template>
	<div>
		<h1>List user-group-subject</h1>
		<router-link
			v-if="$store.getters.userRole == 'ROLE_TEACHER'"
			tag="button"
			class="btn-primary rounded"
			:to="{ name: 'AddUserGroupSubject' }"
		>
			Dodaj user-group-subject
		</router-link>
		<UserGroupSubjectList :data="userGroupSubjects">
			<template v-slot:actions="{ data }">
				<router-link
					:to="{
						name: 'UserGroupSubjectDetails',
						params: { userGroupSubjectID: data.item.id },
					}"
				>
					Szczegóły
				</router-link>
				<template v-if="$store.getters.userRole == 'ROLE_TEACHER'">
					<router-link
						:to="{
							name: 'EditUserGroupSubject',
							params: { userGroupSubjectID: data.item.id },
						}"
						>Edytuj
					</router-link>
					<b-btn variant="danger" @click="deleteUserGroupSubject(data.item.id)"
						>Usuń</b-btn
					>
				</template>
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
	name: 'Groups',
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
				this.$store.toast('error', e);
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
				this.$store.toast('error', e);
			}
			this.loading = false;
		},
	},
};
</script>

<style scoped></style>
