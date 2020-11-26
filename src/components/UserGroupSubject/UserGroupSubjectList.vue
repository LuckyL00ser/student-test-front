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
					key: 'group',
					formatter: group => group.name,
					sortable: true,
				},
				{
					label: 'Przedmiot',
					formatter:  subject=>subject.name,
					key: 'subject',
					sortable: true,
				},
				{
					label: 'Nauczyciel',
					key: 'userTeacher',
					formatter:  teacher=>teacher.name + ' ' + teacher.lastname,
					sortable: true,
				},
				{
					label: 'Student',
					key: 'user',
					formatter:  user=>user.name +' '+user.lastname,
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
