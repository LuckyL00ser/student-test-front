<template>
	<div>
		<router-link :to="{name: 'EditTest',params: {testID: $route.params.testID}}">
			Powrót do edcji testu
		</router-link>
		<br>
		<div>edytuj pytanie ID: {{ $route.params.questionID }}</div>
		<Task :task-id="$route.params.questionID" :test-i-d="$route.params.testID"/>
	</div>
</template>

<script>
import Task from '../../components/Task';
export default {
	name: 'EditQuestion',
	components: { Task },
};
</script>

<style scoped></style>
