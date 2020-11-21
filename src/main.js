import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { initializationUserAuthentication } from './helpers/auth';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import './helpers/validationRules';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { axios } from './helpers/axiosConfig';

Vue.config.productionTip = false;
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

axios.interceptors.response.use(
	response => response,
	error => {
		if (
			error.response.status === 401 &&
			error.response.path != '/api/auth/singup'
		) {
			store.dispatch('refreshToken');
		}

		throw error;
	},
);

initializationUserAuthentication(store);
router.beforeEach((to, from, next) => {
	// route guard
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
	const requiresTeacher = to.matched.some(
		record => record.meta.requiresTeacher,
	);
	const requiresStudent = to.matched.some(
		record => record.meta.requiresStudent,
	);
	const loggedIn = store.state.isLoggedIn;
	const role = loggedIn ? store.getters.userRole : null;

	if (requiresAuth && !loggedIn) {
		next({ name: 'Login' });
	} else if (loggedIn) {
		if (to.name == 'Login' || to.name == 'Register') next({ name: 'Home' });
		else if (
			(requiresStudent && role != 'ROLE_USER') ||
			(requiresTeacher && role != 'ROLE_TEACHER') ||
			(requiresAdmin && role != 'ROLE_ADMIN')
		)
			next({ name: 'Home' });
		else next();
	} else {
		next();
	}
});

const instance = new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');

store.toast = function(variant, message) {
	instance.$bvToast.toast(message, {
		autoHideDelay: 5000,
		variant: variant,
	});
};
