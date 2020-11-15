<template>
	<div>
		dodaj pytanie
		<Task :test-i-d="$route.params.testID" />
	</div>
</template>

<script>
import Task from '../../components/Task';
export default {
	name: 'AddQuestion',
	components: { Task },
};
</script>

<style scoped></style>
