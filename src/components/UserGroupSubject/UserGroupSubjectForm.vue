<template>
	<div>
		<UserList :data="students" :loading="usersLoading">
			<template v-slot:actions="{ data }">
				<b-button @click="selectStudent(data.item)" v-b-modal.modal-1
					>Dodaj do grupy</b-button
				>
			</template>
		</UserList>
		<b-modal
			id="modal-1"
			title="Wybierz grupę i przedmiot dla studenta"
			hide-footer
			:no-close-on-backdrop="loading"
			:no-close-on-esc="loading"
			:hide-header-close="loading"
		>
			<p class="my-4">
				Dla: {{ selectedStudent.name }} {{ selectedStudent.lastname }}
			</p>
			<ValidationObserver v-slot="{ handleSubmit }" ref="form">
				<b-form @submit.prevent="handleSubmit(submit)">
					<ValidationProvider
						rules="required"
						class="flex-grow-1"
						v-slot="vContext"
					>
						<b-form-group label="Przedmiot">
							<SubjectSelector v-model="form.subjectId" />
							<CustomInvalidFeedback :validation-context="vContext" />
						</b-form-group>
					</ValidationProvider>
					<ValidationProvider
						rules="required"
						class="flex-grow-1"
						v-slot="vContext"
					>
						<b-form-group label="Grupa">
							<GroupSelector :teacher="false" v-model="form.groupId" />
							<CustomInvalidFeedback :validation-context="vContext" />
						</b-form-group>
					</ValidationProvider>
					<div class="">
						<b-btn
							squared
							variant="outline-primary"
							:disabled="loading"
							class="shadow"
							type="submit"
							>{{ userGroupSubjectId ? 'Zapisz' : 'Dodaj' }}
						</b-btn>
					</div>
				</b-form>
			</ValidationObserver>
		</b-modal>
	</div>
</template>

<script>
import * as userGroupSubjectAPI from '@/api/userGroupSubjectAPI';
import CustomInvalidFeedback from '../common/CustomInvalidFeedback';
import SubjectSelector from '../Subjects/SubjectSelector';
import GroupSelector from '../Groups/GroupSelector';
import UserList from '../User/UserList';
import { getAllUsers } from '../../api/userAPI';

export default {
	name: 'UserGroupSubjectForm',
	components: {
		UserList,
		GroupSelector,
		SubjectSelector,
		CustomInvalidFeedback,
	},
	props: ['userGroupSubjectId'],
	data() {
		return {
			loading: false,
			usersLoading: false,
			students: [],
			selectedStudent: {},
			form: {
				userId: null,
				teacherId: this.$store.getters.isLoggedIn
					? this.$store.state.user.id
					: null, //restrict route to teacher only
			},
		};
	},
	mounted() {
		//	if (this.userGroupSubjectId) this.getUserGroupSubjectId();
		this.getUsers();
	},
	methods: {
		async getUsers() {
			this.usersLoading = true;
			try {
				let response = await getAllUsers(this.$store.state.user.id); //TODO: filter students only
				this.students = response.data;
			} catch (e) {
				this.$store.toast('error', e);
			}
			this.usersLoading = false;
		},
		selectStudent(student) {
			this.selectedStudent = student;
			this.form.userId = student.id;
		},
		// async getUserGroupSubjectId() {
		// 	this.loading = true;
		// 	try {
		// 		const response = await userGroupSubjectAPI.getAllUserGroupSubjects(
		// 			this.userGroupSubjectId,
		// 		);
		// 		this.form = response.data;
		// 	} catch (e) {
		// 		this.$store.toast('danger', e);
		// 	}
		// 	this.loading = false;
		// },
		async submit() {
			this.loading = true;
			this.$bvModal.hide('modal-1');
			try {
				// if (this.userGroupSubjectId)
				// 	await userGroupSubjectAPI.update(this.userGroupSubjectId, this.form); else
				await userGroupSubjectAPI.createUserGroupSubject(this.form);
				this.$store.toast('success', 'Zapisano zmiany');
				this.$router.back();
			} catch (e) {
				this.$store.toast('danger', e);
			}
			this.loading = false;
		},
	},
};
</script>

<style scoped></style>
