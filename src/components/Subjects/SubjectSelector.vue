<template>
	<b-select
		@input="input"
		:value="value"
		:options="computedSubjects"
	></b-select>
</template>

<script>
import { getAllSubjects } from '../../api/subjectAPI';

export default {
	name: 'SubjectSelector',
	props: ['value'],
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
				const response = await getAllSubjects();
				this.subjects = response.data;
			} catch (e) {
				this.$store.toast('error', e);
			}
		},
	},
};
</script>

<style scoped></style>
