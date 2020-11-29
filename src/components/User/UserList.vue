<template>
	<b-table
		striped
		responsive="true"
		hover
		:items="data"
		:fields="fields"
		:busy="loading"
	>
		<template v-slot:cell(email)="data">
			<a :href="`mailto:${data.item.email}`">{{ data.item.email }}</a>
		</template>
		<template v-slot:cell(actions)="data">
			<slot name="actions" :data="data"></slot>
		</template>
		<template v-slot:table-busy>
			<div class="position-relative">
				<Loader :loading="loading" />
			</div>
		</template>
	</b-table>
</template>

<script>
import Loader from '../common/Loader';

export default {
	name: 'UserList',
	components: { Loader },
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		loading: {
			type: Boolean,
			default: false,
		},
		extraFields: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			fields: [
				{
					label: 'Imię i nazwisko',
					key: 'name',
					sortable: true,
					formatter: (value, key, item) => `${item.name} ${item.lastname}`,
				},
				{
					label: 'Wydział',
					key: 'department',
					sortable: true,
				},
				{
					label: 'Stopień',
					key: 'degree',
					sortable: true,
				},
				{
					label: 'Kierunek',
					key: 'major',
					sortable: true,
				},
				{
					label: 'E-mail',
					key: 'email',
					sortable: true,
				},
				...this.extraFields,
				{
					label: 'Akcje',
					key: 'actions',
				},
			],
		};
	},
};
</script>

<style scoped></style>
