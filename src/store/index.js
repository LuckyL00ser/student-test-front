import Vue from 'vue';
import Vuex from 'vuex';
import { setCredentials } from '../helpers/axiosConfig';
import * as auth from '../helpers/auth';
import { signin, refresh } from '@/api/authAPI';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		isLoggedIn: null,
		user: null,
		timer: null,
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
		setTimer(state, payload) {
			state.timer = payload;
		},
		setRole(state, payload) {
			state.user.roles = [payload];
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
				? state.user.roles[0]
				: null; //
		},
	},
	actions: {
		async login({ dispatch }, credentials) {
			try {
				const response = await signin(credentials);

				dispatch('authorize', response.data);
			} catch (error) {
				console.log(error.response.data.message);
				let message = '';
				if (error.response.data.message == 'Verify your email')
					message = 'Zweryfikuj swój email';
				else message = 'Niepoprawne dane logowania';
				this.toast('danger', message);
				throw error;
			}
		},
		async authorize({ commit }, data) {
			//dispatch
			setCredentials(data.jwt);
			commit('login', data);

			// const timer = setTimeout(() => {
			// 	dispatch('refreshToken');
			// }, 30*1000);
			// commit('setTimer', timer);
		},
		logout({ commit, state }) {
			commit('logout');
			if (state.timer) clearTimeout(state.timer);
			commit('setTimer', null);
			//	this.toast('info', 'Wylogowano');
		},
		async refreshToken({ dispatch, state }) {
			try {
				const response = await refresh();
				dispatch('authorize', { jwt: response.data.jwt, ...state.user });
			} catch (error) {
				dispatch('logout');
			}
		},
	},
	modules: {},
});
export default store;
