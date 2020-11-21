import { axios } from './axiosConfig';

// async function login(credentials) {
// 	try {
// 		const response = await signin(credentials);
// 		await setCredentials(response.data.jwt);
// 		return response.data;
// 	} catch (e) {
// 		console.error(e);
// 	}
// }
function logout() {
	return axios.post('/api/auth/logout');
}
function getUser() {
	return JSON.parse(localStorage.getItem('user'));
}
function getJwt() {
	return JSON.parse(localStorage.getItem('jwt'));
}
function setLocalStorage(user, jwt) {
	if (user && jwt) {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('jwt', JSON.stringify(jwt));
	}
}
function removeFromLocalStorage() {
	localStorage.removeItem('user');
	localStorage.removeItem('jwt');
}
async function initializationUserAuthentication(store) {
	let user = null;
	let jwt = null;

	if (getJwt()) {
		jwt = getJwt();
	} else {
		removeFromLocalStorage();
		return false;
	}
	if (getUser()) {
		user = getUser();
	}
	return store.dispatch('authorize', { jwt, ...user });
}

export {
	//login,
	// register,
	logout,
	removeFromLocalStorage,
	initializationUserAuthentication,
	getUser,
	getJwt,
	setLocalStorage,
};
