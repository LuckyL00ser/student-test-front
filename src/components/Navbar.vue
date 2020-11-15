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
				<template v-if="$store.getters.isLoggedIn">
					<b-btn @click="logout">
						Wyloguj
					</b-btn>
				</template>
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
				// {
				// 	name: 'Pytania',
				// 	route: { name: 'Questions' },
				// },
				{
					name: 'Wyniki',
					route: { name: 'Results' },
				},
				// {
				// 	name: 'Grupy',
				// 	route: { name: 'TeacherGroups',params: {teacherID:this.$store.state.user.id} },
				// },
				// {
				// 	name: 'Przedmioty',
				// 	route: { name: 'TeacherSubjects',params: {teacherID:this.$store.state.user.id} },
				// },
			],
			studentRoutes: [
				{
					name: 'Oceny',
					route: { name: 'Grades' },
				},
				// {
				// 	name: 'Grupy',
				// 	route: { name: 'UserGroups',params: {userID:this.$store.state.user.id} },
				// },
				// {
				// 	name: 'Przedmioty',
				// 	route: { name: 'StudentSubjects',params: {userID:this.$store.state.user.id} },
				// },
			],
			sharedTeacherStudentRoutes: [
				{
					name: 'Testy',
					route: { name: 'Tests' },
				},
				{
					name: 'Przedmioty',
					route: { name: 'Subjects' },
				},
				{
					name: 'Grupy',
					route: { name: 'Groups' },
				},
				{
					name: 'Do oceny',
					route: { name: 'TestsReadyToRate' },
				},
				{
					name: 'User-group-subjects',
					route: { name: 'UserGroupSubjects' },
				},
			],
		};
	},
	computed: {
		currentRoutes() {
			if (this.$store.getters.isLoggedIn) {
				switch (this.$store.getters.userRole) {
					case 'ROLE_ADMIN':
						return this.adminRoutes;
					case 'ROLE_TEACHER':
						return [...this.teacherRoutes, ...this.sharedTeacherStudentRoutes];
					case 'ROLE_USER':
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
