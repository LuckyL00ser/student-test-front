import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import './helpers/validationRules';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

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
	const role = loggedIn ? store.state.user.role : null;

	if (requiresAuth && !loggedIn) {
		next({ name: 'Login' });
	} else if (loggedIn) {
		if (
			(requiresStudent && role != 'student') ||
			(requiresTeacher && role != 'teacher') ||
			(requiresAdmin && role != 'admin')
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
