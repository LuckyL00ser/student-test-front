<template>
	<b-table
		striped
		responsive="true"
		hover
		:items="results"
		:fields="fields"
		:busy="loading"
	>
		<template v-slot:cell(generateTest)="data">
			<router-link
				:to="{
					name: 'EditTest',
					params: { testID: data.item.generateTest.test.id },
				}"
				>{{ data.item.generateTest.test.name }}</router-link
			>
		</template>
		<template v-slot:cell(actions)="data">
			<router-link
				:to="{
					name: 'GenerateTestDetails',
					params: { generateTestId: data.item.generateTest.id },
				}"
			>
				Zobacz odpowiedzi
			</router-link>
			<router-link
				:to="{ name: 'RateTest', params: { resultId: data.item.id } }"
				v-if="$store.getters.userRole === 'ROLE_TEACHER'"
			>
				Oceń test
			</router-link>
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
	name: 'ResultsList',
	components: { Loader },
	props: ['results', 'loading'],
	data() {
		return {
			fields: [
				{
					label: 'Użytkownik',
					key: 'user',
					formatter: item => `${item.name} ${item.lastname}`,
					sortable: true,
				},
				{
					label: 'Test',
					key: 'generateTest',
					sortable: true,
				},
				{
					label: 'Ocena',
					key: 'mark',
				},
				{
					label: 'Punkty',
					key: 'points',
				},
				// {
				// 	label: 'Czy poprawiał?',
				// 	key: 'result',
				// 	formatter: item=>item?`Tak - poprzednio (${item})pkt`:''
				// },
				{
					key: 'actions',
					label: 'Akcje',
				},
			],
		};
	},
	methods: {},
};
</script>

<style scoped></style>
