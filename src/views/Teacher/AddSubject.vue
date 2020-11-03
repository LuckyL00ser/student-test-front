<template>
	<div>
		<h1>Dodaj przedmiot</h1>
		<SubjectForm/>
	</div>
</template>

<script>
import SubjectForm from '../../components/Subjects/SubjectForm';
export default {
	name: 'AddSubject',
	components: { SubjectForm },
};
</script>

<style scoped></style>
