<template>
	<b-form-invalid-feedback :state="getValidationState(validationContext)">
		<ul>
			<li v-for="err in validationContext.errors" :key="err">{{ err }}</li>
		</ul>
	</b-form-invalid-feedback>
</template>

<script>
export default {
	name: 'CustomInvalidFeedback',
	props: ['validationContext'],
	methods: {
		getValidationState({ dirty, validated, valid = null }) {
			return dirty || validated ? valid : null;
		},
	},
};
</script>

<style scoped></style>
