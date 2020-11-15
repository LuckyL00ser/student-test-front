<template>
	<div>
		<ValidationObserver v-slot="{ handleSubmit }" ref="form">
			<b-form @submit.prevent="handleSubmit(submit)">
				<ValidationProvider rules="required" class="flex-grow-1"
									v-slot="vContext">
					<b-form-group label="Przedmiot">
						<SubjectSelector v-model="form.subjectBySubjectId"/>
						<CustomInvalidFeedback :validation-context="vContext" />
					</b-form-group>
				</ValidationProvider>
				<ValidationProvider rules="required" class="flex-grow-1"
									v-slot="vContext">
					<b-form-group label="Grupa">
						<GroupSelector :teacher="false" v-model="form.groupByGroupId"/>
						<CustomInvalidFeedback :validation-context="vContext" />
					</b-form-group>
				</ValidationProvider>
				<ValidationProvider rules="required" class="flex-grow-1"
									v-slot="vContext">
					<b-form-group label="Nauczyciel">
						<UserSelector :teachers="true" v-model="form.userByTeacherId"/>
						<CustomInvalidFeedback :validation-context="vContext" />
					</b-form-group>
				</ValidationProvider>
				<ValidationProvider rules="required" class="flex-grow-1"
									v-slot="vContext">
					<b-form-group label="Student">
						<UserSelector v-model="form.userByUserId"/>
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
						>{{userGroupSubjectId?'Zapisz':'Dodaj'}}
					</b-btn>
				</div>
			</b-form>
		</ValidationObserver>
	</div>
</template>

<script>
import * as userGroupSubjectAPI from '@/api/userGroupSubjectAPI'
import CustomInvalidFeedback from '../common/CustomInvalidFeedback';
import SubjectSelector from '../Subjects/SubjectSelector';
import GroupSelector from '../Groups/GroupSelector';
import UserSelector from '../User/UserSelector';

export default {
	name: 'UserGroupSubjectForm',
	components: { UserSelector, GroupSelector, SubjectSelector, CustomInvalidFeedback },
	props: ['userGroupSubjectId'],
	data() {
		return {
			loading: false,
			form: {	},
		};
	},
	mounted() {
		if(this.userGroupSubjectId)
			this.getUserGroupSubjectId()
	},
	methods: {
		async getUserGroupSubjectId(){
			this.loading =true;
			try{
				const response = await userGroupSubjectAPI.getAllUserGroupSubjects(this.userGroupSubjectId);
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
				if(this.userGroupSubjectId)
					await userGroupSubjectAPI.update(this.userGroupSubjectId,this.form)
				else
					await userGroupSubjectAPI.create(this.form)
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
