import Vue from 'vue';
import Vuex from 'vuex';
import { setCredentials } from '../helpers/axiosConfig';
import * as auth from '../helpers/auth';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoggedIn: null,
		user: null,
	},
	mutations: {
		login(state, payload) {
			state.isLoggedIn = true;
			state.user = payload;
			auth.setLocalStorageUser(payload);
		},
		logout(state) {
			state.isLoggedIn = false;
			state.user = null;
			auth.removeUserFromStorage();
		},
	},
	getters: {
		isLoggedIn(state) {
			return state.isLoggedIn;
		},
	},
	actions: {
		async login({ dispatch }, credentials) {
			try {
				// const response = await auth.login(credentials);
				console.log(credentials);
				dispatch('authorize', { name: 'Testowy User', role: 'teacher', id: 1 }); //response.data
			} catch (error) {
				this.toast('error', 'Niepoprawne dane logowania');
				throw Error(error);
			}
		},
		async authorize({ commit }, data) {
			setCredentials();
			commit('login', data);
		},
		logout({ commit }) {
			commit('logout');
			this.toast('info', 'Wylogowano');
		},
	},
	modules: {},
});
