<template>
	<div>
		<ValidationObserver v-slot="{ handleSubmit }" ref="form">
			<b-form @submit.prevent="handleSubmit(submit)">
				<b-row>
					<ValidationProvider rules="required" v-slot="vContext" class="col-6">
						<b-form-group label="Nazwa">
							<b-form-input v-model="form.name" type="text" name="text" />

							<CustomInvalidFeedback :validation-context="vContext" />
						</b-form-group>
					</ValidationProvider>
					<ValidationProvider
						rules="required|numeric"
						v-slot="vContext"
						class="col-6"
					>
						<b-form-group label="Czas na wypełnienie (minuty)">
							<b-form-spinbutton
								v-model="form.time"
								:min="1"
								:max="100"
							></b-form-spinbutton>
							<CustomInvalidFeedback :validation-context="vContext" />
						</b-form-group>
					</ValidationProvider>
				</b-row>
				<b-row>
					<ValidationProvider rules="required" v-slot="vContext" class="col-6">
						<b-form-group label="Przedmiot">
							<SubjectSelector v-model="form.subjectId" v-if="!testID"/>
							<SubjectSelector v-model="form.subject.id" :disabled="true" v-else/>

							<CustomInvalidFeedback :validation-context="vContext" />
						</b-form-group>
					</ValidationProvider>
					<ValidationProvider
						rules="required|numeric"
						v-slot="vContext"
						class="col-6"
					>
						<b-form-group label="Ilość pytań">
							<b-form-spinbutton
								v-model="form.fullPoints"
								min="1"
							></b-form-spinbutton>
							<CustomInvalidFeedback :validation-context="vContext" />
						</b-form-group>
					</ValidationProvider>
				</b-row>
				<ValidationProvider
					rules="required"
					class="flex-grow-1"
					v-slot="vContext"
				>
					<b-form-group label="Dostępny do wypełniania od">
						<b-form-datepicker v-model="form.date" />
						<CustomInvalidFeedback :validation-context="vContext" />
					</b-form-group>
				</ValidationProvider>
				<div class="">
					<b-btn
						squared
						variant="outline-primary"
						:disabled="loading"
						class="shadow"
						type="submit"
						>{{ testID ? 'Zapisz' : 'Dodaj' }}
					</b-btn>
				</div>
			</b-form>
		</ValidationObserver>
	</div>
</template>

<script>
import * as testAPI from '@/api/testAPI';
import CustomInvalidFeedback from '../common/CustomInvalidFeedback';
import SubjectSelector from '../Subjects/SubjectSelector';
import { getAllSubjects } from '../../api/subjectAPI';

export default {
	name: 'TestForm',
	components: { SubjectSelector, CustomInvalidFeedback },
	props: ['testID'],
	data() {
		return {
			loading: false,
			form: {
				fullPoints: 1,
				time: 1,
				subject: {}
			},
		};
	},
	mounted() {
		if (this.testID) this.getTest();
		this.getSubjects();
	},
	computed: {
		computedSubjects() {
			return this.subjects.map(x => {
				return {
					text: x.name,
					value: x.id,
				};
			});
		},
	},
	methods: {
		async getTest() {
			this.loading = true;
			try {
				const response = await testAPI.getTest(this.testID);
				this.form = response.data;
				this.form.subjectId = response.data.subjectBySubjectId.id;
			} catch (e) {
				this.$store.toast('danger', e);
			}
			this.loading = false;
		},
		async getSubjects() {
			try {
				const response = await getAllSubjects();
				this.subjects = response.data;
			} catch (e) {
				this.$store.toast('danger', e);
			}
		},
		async submit() {
			this.loading = true;
			try {
				this.form.date = new Date(this.form.date);
				if (this.testID) await testAPI.updateTest(this.testID, this.form);
				else await testAPI.createTest(this.form);
				this.$store.toast('success', 'Zapisano zmiany');
				this.$router.back();
			} catch (e) {
				this.$store.toast('danger', e);
			}
			this.loading = false;
		},
	},
};
</script>

<style scoped></style>
