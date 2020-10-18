<template>
	<b-container>
		<b-row>
			<b-col cols="12" md="8" lg="6" class="mx-auto position-relative">
				<div class="center-horizontally shadow-sm p-5">
					<h3>Zarejestruj się</h3>
					<ValidationObserver v-slot="{ handleSubmit }" ref="form">
						<b-form @submit.prevent="handleSubmit(login)">
							<ValidationProvider
								v-slot="vContext"
								rules="email"
								class="flex-grow-1"
							>
								<b-form-group label="E-mail">
									<b-form-input v-model="loginData.email" name="email" />
									<CustomInvalidFeedback :validation-context="vContext" />
								</b-form-group>
							</ValidationProvider>
							<ValidationProvider rules="required" class="flex-grow-1">
								<b-form-group label="Hasło">
									<b-form-input
										v-model="loginData.password"
										type="password"
										name="password"
									/>
								</b-form-group>
							</ValidationProvider>
							<div class="w-100 text-center">
								<b-btn
									squared
									variant="outline-primary"
									size="lg"
									:disabled="registering"
									class="shadow"
									type="submit"
									>Zarejestruj</b-btn
								>
							</div>
						</b-form>
					</ValidationObserver>
				</div>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import CustomInvalidFeedback from '../components/common/CustomInvalidFeedback';

export default {
	name: 'Register',
	components: { CustomInvalidFeedback },
	data() {
		return {
			registering: false,
			loginData: {
				email: '',
				password: '',
			},
		};
	},
	methods: {
		async login() {
			try {
				this.registering = true;
				//register
				this.$router.push({ name: 'Login' });
				this.$store.toast('info', 'Zarejestrowano');
			} catch (e) {
				this.$store.toast('error', 'Błąd rejestracji' + e);
			}
			this.registering = false;
		},
	},
};
</script>

<style scoped></style>
