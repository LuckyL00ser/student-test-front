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
						>{{groupID?'Zapisz':'Dodaj'}}
					</b-btn>
				</div>
			</b-form>
		</ValidationObserver>
	</div>
</template>

<script>
import * as groupAPI from '@/api/groupAPI'
import CustomInvalidFeedback from '../common/CustomInvalidFeedback';

export default {
	name: 'GroupForm',
	components: { CustomInvalidFeedback },
	props: ['groupID'],
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
				const response = await groupAPI.getGroup(this.groupID);
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
				if(this.groupID)
					await groupAPI.updateGroup(this.groupID,this.form)
				else
					await groupAPI.createGroup(this.form)
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
