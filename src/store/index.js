import Vue from 'vue';
import Vuex from 'vuex';
import { setCredentials } from '../helpers/axiosConfig';
import * as auth from '../helpers/auth';
import { signin } from '@/api/authAPI';
import { refresh } from '../api/authAPI';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoggedIn: null,
		user: null,
	},
	mutations: {
		login(state, payload) {
			state.isLoggedIn = true;
			const { jwt, ...user } = payload;
			state.user = user;
			auth.setLocalStorage(user, jwt);
		},
		logout(state) {
			state.isLoggedIn = false;
			state.user = null;
			auth.removeFromLocalStorage();
		},
	},
	getters: {
		isLoggedIn(state) {
			return state.isLoggedIn;
		},
		userRole(state) {
			return state.isLoggedIn &&
				state.user &&
				state.user.roles &&
				state.user.roles.length
				? 'ROLE_TEACHER'
				: null; // state.user.roles[0]
		},
	},
	actions: {
		async login({ dispatch }, credentials) {
			try {
				const response = await signin(credentials);

				dispatch('authorize', response.data);
			} catch (error) {
				this.toast('error', 'Niepoprawne dane logowania');
				throw Error(error);
			}
		},
		async authorize({ commit }, data) {
			setCredentials(data.jwt);
			commit('login', data);
		},
		logout({ commit }) {
			commit('logout');
			this.toast('info', 'Wylogowano');
		},
		async refreshToken({ dispatch, state }) {
			try {
				const response = await refresh();
				setCredentials(response.data.jwt);
				auth.setLocalStorage(state.user, response.data.jwt);
			} catch (error) {
				dispatch('logout');
			}
		},
	},
	modules: {},
});
