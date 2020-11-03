<template>
	<div>
		<h1>Edytuj przedmiot</h1>
		<SubjectForm :subject-i-d="$route.params.subjectID"/>
	</div>
</template>

<script>
	import SubjectForm from '../../components/Subjects/SubjectForm';
	export default {
		name: 'EditSubject',
		components: { SubjectForm },
	};
</script>

<style scoped></style>
