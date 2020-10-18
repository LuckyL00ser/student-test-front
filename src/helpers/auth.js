import { axios, setCredentials } from './axiosConfig';

async function login(credentials) {
	try {
		await setCredentials();
		const data = await axios.post('/api/auth/login', credentials);
		return data;
	} catch (e) {
		console.error(e);
	}
}
function logout() {
	return axios.post('/api/auth/logout');
}
function getUser() {
	return JSON.parse(sessionStorage.getItem('user'));
}
function setLocalStorageUser(user) {
	if (user) {
		sessionStorage.setItem('user', JSON.stringify(user));
	}
}
function removeUserFromStorage() {
	sessionStorage.removeItem('user');
}
async function initializationUserAuthentication(store) {
	if (getUser()) {
		const data = getUser();
		return store.dispatch('authorize', data);
	}
	return false;
}

export {
	login,
	// register,
	logout,
	removeUserFromStorage,
	initializationUserAuthentication,
	getUser,
	setLocalStorageUser,
};
