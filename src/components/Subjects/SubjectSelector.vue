<template>
	<b-select
		@input="input"
		:value="value"
		:options="computedSubjects"
		:disabled="disabled"
	></b-select>
</template>

<script>
	import {  getTeacherSubjects } from '../../api/subjectAPI';

export default {
	name: 'SubjectSelector',
	props: ['value', 'disabled'],
	data() {
		return {
			subjects: [],
		};
	},

	computed: {
		computedSubjects() {
			return this.subjects.map(x => {
				return {
					text: x.name,
					value: x.id,
				};
			});
		},
	},
	mounted() {
		this.getSubjects();
	},
	methods: {
		input(value) {
			this.$emit('input', value);
		},

		async getSubjects() {
			try {
				const response =  await getTeacherSubjects(this.$store.state.user.id);	//only current teacher subjects
				this.subjects = response.data;
			} catch (e) {
				this.$store.toast('danger', e);
			}
		},
	},
};
</script>

<style scoped></style>
