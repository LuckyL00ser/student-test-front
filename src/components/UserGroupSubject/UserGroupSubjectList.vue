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
					formatter:  group=>group.name,
					sortable: true,
				},
				{
					label: 'Przedmiot',
				//	formatter:  subject=>subject.name,
					key: 'subjectBySubjectId',
					sortable: true,
				},
				{
					label: 'Nauczyciel',
					key: 'userByTeacherId',
			//		formatter:  teacher=>teacher.name + ' ' + teacher.lastname,
					sortable: true,
				},
				{
					label: 'Student',
					key: 'userByUserId',
			//		formatter:  user=>user.name +' '+user.lastname,
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
