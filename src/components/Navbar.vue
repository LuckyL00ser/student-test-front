<template>
	<b-navbar toggleable="lg" type="light" variant="info" class="shadow-sm">
		<b-navbar-brand to="/">
			TestyApp
		</b-navbar-brand>
		<b-navbar-toggle target="nav-collapse" />
		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav class="ml-auto">
				<b-nav-item
					v-for="route in currentRoutes"
					:key="route.name"
					:to="route.route"
				>
					{{ route.name }}
				</b-nav-item>
				<b-btn v-if="$store.getters.isLoggedIn" @click="logout">
					Wyloguj
				</b-btn>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
export default {
	name: 'Navbar',
	data() {
		return {
			defaultRoutes: [
				{
					name: 'Logowanie',
					route: { name: 'Login' },
				},
				{
					name: 'Rejestracja',
					route: { name: 'Register' },
				},
			],
			adminRoutes: [],
			teacherRoutes: [
				{
					name: 'Pytania',
					route: { name: 'Questions' },
				},
				{
					name: 'Wyniki',
					route: { name: 'Results' },
				},
			],
			studentRoutes: [
				{
					name: 'Oceny',
					route: { name: 'Grades' },
				},
			],
			sharedTeacherStudentRoutes: [
				{
					name: 'Testy',
					route: { name: 'Tests' },
				},
				{
					name: 'Do oceny',
					route: { name: 'TestsReadyToRate' },
				},
			],
		};
	},
	computed: {
		currentRoutes() {
			if (this.$store.getters.isLoggedIn) {
				switch (this.$store.state.user.role) {
					case 'admin':
						return this.adminRoutes;
					case 'teacher':
						return [...this.teacherRoutes, ...this.sharedTeacherStudentRoutes];
					case 'student':
						return [...this.studentRoutes, ...this.sharedTeacherStudentRoutes];
				}
			}
			return this.defaultRoutes;
		},
	},
	methods: {
		logout() {
			this.$store.dispatch('logout');
			if (this.$route.name !== 'Home') this.$router.push({ name: 'Home' });
		},
	},
};
</script>

<style scoped></style>
