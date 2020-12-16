<template>
	<b-container>
		<b-row>
			<b-col cols="12" md="8" lg="6" class="mx-auto position-relative">
				<div class="center-horizontally shadow-sm p-5">
					<h3>Zarejestruj się</h3>
					<ValidationObserver v-slot="{ handleSubmit }" ref="form">
						<b-form @submit.prevent="handleSubmit(login)">
							<b-form-row>
								<b-col>
									<ValidationProvider v-slot="vContext" rules="required">
										<b-form-group label="Imię">
											<b-form-input v-model="loginData.name" name="name" />
											<CustomInvalidFeedback :validation-context="vContext" />
										</b-form-group>
									</ValidationProvider>
								</b-col>
								<b-col>
									<ValidationProvider v-slot="vContext" rules="required">
										<b-form-group label="Nazwisko">
											<b-form-input
												v-model="loginData.lastname"
												name="lastname"
											/>
											<CustomInvalidFeedback :validation-context="vContext" />
										</b-form-group>
									</ValidationProvider>
								</b-col>
							</b-form-row>
							<ValidationProvider
								v-slot="vContext"
								rules="required"
								class="flex-grow-1"
							>
								<b-form-group label="Kierunek">
									<b-form-input v-model="loginData.major" name="login" />
									<CustomInvalidFeedback :validation-context="vContext" />
								</b-form-group>
							</ValidationProvider>
							<ValidationProvider
								v-slot="vContext"
								rules="required"
								class="flex-grow-1"
							>
								<b-form-group label="Wydział">
									<b-form-input v-model="loginData.department" name="login" />
									<CustomInvalidFeedback :validation-context="vContext" />
								</b-form-group>
							</ValidationProvider>
							<ValidationProvider
								v-slot="vContext"
								rules="required"
								class="flex-grow-1"
							>
								<b-form-group label="Stopień">
									<b-form-input v-model="loginData.degree" name="login" />
									<CustomInvalidFeedback :validation-context="vContext" />
								</b-form-group>
							</ValidationProvider>
							<ValidationProvider
								v-slot="vContext"
								rules="required|min:4"
								class="flex-grow-1"
							>
								<b-form-group label="Login">
									<b-form-input v-model="loginData.login" name="login" />
									<CustomInvalidFeedback :validation-context="vContext" />
								</b-form-group>
							</ValidationProvider>
							<ValidationProvider
								v-slot="vContext"
								rules="email|required"
								class="flex-grow-1"
							>
								<b-form-group label="E-mail">
									<b-form-input v-model="loginData.email" name="email" />
									<CustomInvalidFeedback :validation-context="vContext" />
								</b-form-group>
							</ValidationProvider>
							<ValidationProvider rules="required|min:5" class="flex-grow-1">
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
import { signup } from '../api/authAPI';

export default {
	name: 'Register',
	components: { CustomInvalidFeedback },
	data() {
		return {
			registering: false,
			loginData: {
				email: '',
				login: '',
				name: '',
				lastname: '',
				password: '',
			},
		};
	},
	methods: {
		async login() {
			try {
				this.registering = true;
				await signup(this.loginData);
				this.$router.push({ name: 'Login' });
				this.$store.toast('info', 'Zarejestrowano');
			} catch (e) {
				this.$store.toast(
					'danger',
					'Błąd rejestracji' + e.response.data.message,
				);
			}
			this.registering = false;
		},
	},
};
</script>

<style scoped></style>
