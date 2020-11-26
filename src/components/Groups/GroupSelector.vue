<template>
	<b-select @input="input" :value="value" :options="computedGroups"></b-select>
</template>

<script>
import {  getTeacherGroups } from '../../api/groupAPI';

export default {
	name: 'GroupSelector',
	props: ['value'],
	data() {
		return {
			groups: [],
		};
	},

	computed: {
		computedGroups() {
			return this.groups.map(x => {
				return {
					text: x.name,
					value: x.id,
				};
			});
		},
	},
	mounted() {
		this.getGroups();
	},
	methods: {
		input(value) {
			this.$emit('input', value);
		},

		async getGroups() {
			try {
				const response = await getTeacherGroups(this.$store.state.user.id);
				this.groups = response.data;
			} catch (e) {
				this.$store.toast('danger', e);
			}
		},
	},
};
</script>

<style scoped></style>
