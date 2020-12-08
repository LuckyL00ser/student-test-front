<template>
	<div>
		<h1>Przypisz studenta</h1>
		<UserGroupSubjectForm />
	</div>
</template>

<script>
import UserGroupSubjectForm from '../../components/UserGroupSubject/UserGroupSubjectForm';
export default {
	name: 'AddUserGroupSubject',
	components: { UserGroupSubjectForm },
};
</script>

<style scoped></style>
