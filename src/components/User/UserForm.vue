<template>
	<div>
		<ValidationObserver v-slot="{ handleSubmit }" ref="form">
			<b-form @submit.prevent="handleSubmit(submit)">
				<ValidationProvider
					rules="required"
					class="flex-grow-1"
					v-slot="vContext"
				>
					<b-form-group label="Nazwa">
						<b-form-input v-model="form.name" type="text" name="text" />

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
						>{{ userGroupSubjectId ? 'Zapisz' : 'Dodaj' }}
					</b-btn>
				</div>
			</b-form>
		</ValidationObserver>
	</div>
</template>

<script>
import * as userGroupSubjectAPI from '@/api/userGroupSubjectAPI';
import CustomInvalidFeedback from '../common/CustomInvalidFeedback';

export default {
	name: 'UserGroupSubjectForm',
	components: { CustomInvalidFeedback },
	props: ['userGroupSubjectId'],
	data() {
		return {
			loading: false,
			form: {},
		};
	},
	mounted() {
		if (this.userGroupSubjectId) this.getUserGroupSubjectId();
	},
	methods: {
		async getUserGroupSubjectId() {
			this.loading = true;
			try {
				const response = await userGroupSubjectAPI.getAllUserGroupSubjects(
					this.userGroupSubjectId,
				);
				this.form = response.data;
			} catch (e) {
				this.$store.toast('danger', e);
			}
			this.loading = false;
		},
		async submit() {
			this.loading = true;
			try {
				if (this.userGroupSubjectId)
					await userGroupSubjectAPI.update(this.userGroupSubjectId, this.form);
				else await userGroupSubjectAPI.create(this.form);
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
