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
	name: 'GroupsList',
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
					label: 'Nazwa',
					key: 'name',
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
