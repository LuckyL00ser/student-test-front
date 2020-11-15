<template>
	<div>
		<h1>Edytuj user-group-subject</h1>
		<UserGroupSubjectForm
			:user-group-subject-id="$route.params.userGroupSubjectID"
		/>
	</div>
</template>

<script>
import UserGroupSubjectForm from '../../components/UserGroupSubject/UserGroupSubjectForm';
export default {
	name: 'EditUserGroupSubject',
	components: { UserGroupSubjectForm },
};
</script>

<style scoped></style>
