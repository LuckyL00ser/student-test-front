<template>
	<div>
		<div class="d-flex align-items-center justify-content-between mt-2 mb-4">
			<h3>Dodaj pytanie</h3>
			<router-link
				v-if="$store.getters.userRole == 'ROLE_TEACHER'"
				:to="{ name: 'EditTest', params: { testID: $route.params.testID } }"
			>
				Powrót do edcji testu
			</router-link>
		</div>
		<Task
			:task-id="$route.params.questionID"
			:test-i-d="$route.params.testID"
		/>
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
