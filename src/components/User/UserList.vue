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
			<Loader :loading="loading" />
		</template>
	</b-table>
</template>

<script>
import Loader from '../common/Loader';

export default {
	name: 'UserGroupSubjectList',
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
					label: 'Grupa',
					key: 'groupByGroupId',
					sortable: true,
				},
				{
					label: 'Przedmiot',
					key: 'subjectBySubjectId',
					sortable: true,
				},
				{
					label: 'Nauczyciel',
					key: 'userByTeacherId',
					sortable: true,
				},
				{
					label: 'Student',
					key: 'userByUserId',
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
