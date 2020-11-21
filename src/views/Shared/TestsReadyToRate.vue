<template>
	<div>
		<h2>Testy oczekujace do oceny</h2>
		<TestsList
			:data="exampleTests"
			:extra-fields="extraFields"
			:loading="loading"
		>
			<template v-slot:actions="{ data }">
				<template v-if="$store.state.user.role == 'teacher'">
					<router-link
						:to="{ name: 'RateTest', params: { testID: data.item.id } }"
						>Oceń</router-link
					>
				</template>
			</template>
		</TestsList>
	</div>
</template>

<script>
import TestsList from '../../components/Tests/TestsList';
export default {
	name: 'TestsReadyToRate',
	components: { TestsList },
	data() {
		return {
			extraFields: [
				{
					label: 'Student',
					key: 'student',
					formatter: student => student.name,
				},
				{
					label: 'Wypełniono',
					key: 'created_at',
					formatter: date => date.toLocaleString(),
				},
			],
			exampleTests: [
				{
					id: 1,
					name: 'Systemy rozproszone',
					time: '12',
					created_at: new Date('2012/10/12'),
					student: {
						name: 'Karol',
					},
				},
				{
					id: 2,
					name: 'Fizyka',
					time: '35',
					created_at: new Date('2020/10/05'),
					student: {
						name: 'Kamil',
					},
				},
				{
					id: 3,
					name: 'Inzynieria Systemow',
					time: '22',
					created_at: new Date('2020/09/23'),
					student: {
						name: 'Wojtek',
					},
				},
			],
			loading: false,
		};
	},
	methods: {
		async deleteTest(id) {
			try {
				//TODO: api call
				this.exampleTests.splice(id, 1);
				this.$store.toast('success', 'Usunięto test');
				this.$emit('testDeleted', id);
			} catch (e) {
				this.$store.toast('danger', 'Niepowodzenie ususwania testu' + e);
			}
		},
	},
};
</script>

<style scoped></style>
