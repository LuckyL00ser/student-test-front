<template>
	<b-table
		striped
		responsive="true"
		hover
		:items="data"
		:fields="fields"
		:busy="loading"
	>
		<template v-slot:cell(actions)="data">
			<slot name="actions" :data="data"> </slot>
		</template>
		<template v-slot:table-busy>
			<Loader :loading="loading" />
		</template>
	</b-table>
</template>

<script>
import Loader from '../common/Loader';
export default {
	name: 'TestsList',
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
		rated: {
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
					label: 'Nazwa',
					key: 'name',
					sortable: true,
				},
				{
					label: 'Punkty do zdobycia',
					key: 'fullPoints',
				},
				{
					label: 'Czas na wykonanie',
					key: 'time',
				},
				{
					label: 'Data',
					key: 'date',
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
