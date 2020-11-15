<template>
	<div>
		<router-link :to="{name: 'EditTest',params: {testID: $route.params.testID}}">
			Powrót do edcji testu
		</router-link>
		<br>
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
