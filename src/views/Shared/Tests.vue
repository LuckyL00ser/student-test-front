<template>
	<div>
		testy
		<router-link
			v-if="$store.state.user.role == 'teacher'"
			tag="button"
			class="btn-primary rounded"
			:to="{ name: 'AddTest' }"
		>
			Stwórz nowy
		</router-link>
		<TestsList :data="exampleTests">
			<template v-slot:actions="{ data }">
				<template v-if="$store.state.user.role == 'teacher'">
					<router-link
						:to="{ name: 'EditTest', params: { testID: data.item.id } }"
						>Edytuj
					</router-link>
					<b-btn @click="deleteTest(data.item.id)">Usuń</b-btn>
				</template>
				<template v-else-if="$store.state.user.role == 'student'">
					<router-link
						:to="{ name: 'FillTest', params: { testID: data.item.id } }"
						>Zacznij wypelniac</router-link
					>
				</template>
			</template>
		</TestsList>
	</div>
</template>

<script>
import TestsList from '../../components/Tests/TestsList';
export default {
	name: 'Tests',
	components: { TestsList },
	data() {
		return {
			exampleTests: [
				{
					id: 1,
					name: 'Grafika',
					time: '20',
				},
				{
					id: 2,
					name: 'Cyberbezpieczenstwo',
					time: '35',
				},
				{
					id: 3,
					name: 'WF',
					time: '22',
				},
				{
					id: 4,
					name: 'Matematyka dyskretna',
					time: '15',
				},
			],
		};
	},
	methods: {
		async deleteTest(id) {
			try {
				//TODO: api call
				this.exampleTests.splice(id - 1, 1);
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
