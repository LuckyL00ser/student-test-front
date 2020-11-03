<template>
	<div>
		<ValidationObserver v-slot="{ handleSubmit }" ref="form">
			<b-form @submit.prevent="handleSubmit(submit)">
				<ValidationProvider rules="required" class="flex-grow-1"
									v-slot="vContext">
					<b-form-group label="Nazwa">
						<b-form-input
							v-model="form.name"
							type="text"
							name="text"
						/>

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
						>{{subjectID?'Zapisz':'Dodaj'}}
					</b-btn>
				</div>
			</b-form>
		</ValidationObserver>
	</div>
</template>

<script>
import * as subjectAPI from '@/api/subjectAPI'
import CustomInvalidFeedback from '../common/CustomInvalidFeedback';

export default {
	name: 'SubjectForm',
	components: { CustomInvalidFeedback },
	props: ['subjectID'],
	data() {
		return {
			loading: false,
			form: {},
		};
	},
	mounted() {
		if(this.subjectID)
			this.getSubject()
	},
	methods: {
		async getSubject(){
			this.loading =true;
			try{
				const response = await subjectAPI.getSubject(this.subjectID);
				this.form = response.data;
			}
			catch(e){
				this.$store.toast('error',e)
			}
			this.loading = false;
		},
		async submit(){
			this.loading = true;
			try {
				if(this.subjectID)
					await subjectAPI.updateSubject(this.subjectID,this.form)
				else
					await subjectAPI.createSubject(this.form)
				this.$store.toast('success','Zapisano zmiany');
				this.$router.back();
            }
            catch(e){
				this.$store.toast('error',e);
            }
			this.loading = false;
        }
  }
};
</script>

<style scoped></style>
