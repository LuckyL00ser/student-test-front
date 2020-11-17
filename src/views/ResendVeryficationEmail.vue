<template>
	<b-container fluid>
		<b-col cols="12" md="8" lg="6" class="mx-auto position-relative">
			<div class="center-horizontally shadow-sm p-5">
				<h4>Wyślij wiadomość weryfikacyjną</h4>
				<b-input v-model="email" placeholder="Email..."></b-input>
				<div class="w-100 text-center">
					<b-btn
						squared
						variant="outline-primary"
						size="lg"
						class="shadow mt-3"
						@click="resendVeryficationEmail()"
						>Wyślij</b-btn
					>
				</div>
			</div>
		</b-col>
	</b-container>
</template>

<script>
import * as authAPI from '@/api/authAPI';
export default {
	name: 'ResendVeryficationEmail',
	data: function() {
		return {
			email: '',
		};
	},
	methods: {
		async resendVeryficationEmail() {
			if (this.email !== '') {
				try {
					authAPI.resetConfirmation(this.email);
					this.$store.toast(
						'info',
						'Email weryfikacyjny został ponownie wysłany',
					);
				} catch (ex) {
					this.$store.toast(
						'error',
						'Email weryfikacyjny nie został ponownie wysłany',
					);
					throw ex;
				}
			}
		},
	},
};
</script>
