<template>
	<b-select @input="input" :value="value" :options="computedUsers"></b-select>
</template>

<script>
import { getAllUsers } from '../../api/userAPI';

export default {
	name: 'UserSelector',
	props: ['value', 'teachers'],
	data() {
		return {
			users: [],
		};
	},

	computed: {
		computedUsers() {
			return this.users.map(x => {
				return {
					text: x.name,
					value: x.id,
				};
			});
		},
	},
	mounted() {
		this.getUsers();
	},
	methods: {
		input(value) {
			this.$emit('input', value);
		},

		async getUsers() {
			try {
				const response = await getAllUsers();
				this.users = response.data.filter(x =>
					this.teachers ? x.role == 'ROLE_TEACHER' : x.role == 'ROLE_USER',
				);
			} catch (e) {
				this.$store.toast('danger', e);
			}
		},
	},
};
</script>

<style scoped></style>
