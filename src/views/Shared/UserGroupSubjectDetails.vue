<template>
	<div>
		<h1>Szczegóły user-group-subject</h1>
		<p>
			Przedmiot:
			<router-link
				:to="{
					route: 'SubjectDetails',
					params: { subjectID: form.subjectBySubjectId.id },
				}"
			>
				{{ form.subjectBySubjectId.name }}
			</router-link>
		</p>
		<p>
			Grupa:
			<router-link
				:to="{
					route: 'GroupDetails',
					params: { groupID: form.groupByGroupId.id },
				}"
			>
				{{ form.groupByGroupId.name }}
			</router-link>
		</p>
		<p>
			Nauczyciel: {{ form.userByTeacherId.name }}
			{{ form.userByUserId.lastname }}
		</p>
		<p>
			Student: {{ form.userByUserId.name }} {{ form.userByUserId.lastname }}
		</p>
	</div>
</template>

<script>
import * as userGroupSubjectAPI from '@/api/userGroupSubjectAPI';

export default {
	name: 'UserGroupSubjectDetails',
	props: ['userGroupSubjectID'],
	data() {
		return {
			loading: false,
			form: {},
		};
	},
	mounted() {
		this.getUserGroupSubject();
	},
	methods: {
		async getUserGroupSubject() {
			this.loading = true;
			try {
				const response = await userGroupSubjectAPI.getUserGroupSubject(
					this.$route.params.userGroupSubjectID,
				);
				this.form = response.data;
			} catch (e) {
				this.$store.toast('error', e);
			}
			this.loading = false;
		},
	},
};
</script>

<style scoped></style>
