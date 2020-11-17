<template>
	<b-row>
		<b-col cols="12" md="8" lg="6" class="mx-auto position-relative">
			<div class="center-horizontally shadow-sm p-5">
				<h3>Zaloguj się</h3>
				<ValidationObserver v-slot="{ handleSubmit }" ref="form">
					<b-form @submit.prevent="handleSubmit(login)">
						<b-form-group label="Login">
							<b-form-input v-model="loginData.login" name="login" />
						</b-form-group>
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
								:disabled="loggingIn"
								class="shadow"
								type="submit"
								>Zaloguj</b-btn
							> <br />
							<b-link href="#/resendVeryficationMail">Ponowna weryfikacja email</b-link>
						</div>
					</b-form>
				</ValidationObserver>
			</div>
		</b-col>
	</b-row>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			loggingIn: false,
			loginData: {
				login: '',
				password: '',
			},
		};
	},
	methods: {
		async login() {
			try {
				this.loggingIn = true;
				await this.$store.dispatch('login', this.loginData);
				this.$router.push('/');
			//	this.$store.toast('info', 'Zalogowano');
			} catch (e) {
				console.error(e);
			}
			this.loggingIn = false;
		},
	},
};
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
