<template>
	<div>
		<h2>Wybierz test który chcesz wypełnić</h2>
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
				<template v-else-if="new Date(data.item.date)<new Date()">
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
import { getAllTests } from '../../api/testAPI';
export default {
	name: 'Tests',
	components: { TestsList },
	data() {
		return {
			exampleTests: [],
		};
	},
	mounted() {
		this.getTests();
	},
	methods: {
		async getTests(){
			try{
				const response = await getAllTests();
				this.exampleTests = response.data
			}
			catch (e) {
				this.$store.toast('error', 'Niepowodzenie ususwania testu' + e);
			}
		},
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
