import axios from 'axios';

axios.defaults.baseURL =
	process.env.NODE_ENV === 'production' ? '/' : 'https://quiz-server-prz.herokuapp.com/';

async function setCredentials(jwt) {
	axios.defaults.headers.common = {'Authorization': `Bearer ${jwt}`}
	// try {
	//   await axios.get("/sanctum/csrf-cookie");
	// } catch (e) {
	//   console.error(e);
	// }
}

export { axios, setCredentials };
