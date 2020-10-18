import axios from 'axios';

axios.defaults.baseURL =
	process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8000';

axios.defaults.withCredentials = true;
async function setCredentials() {
	// try {
	//   await axios.get("/sanctum/csrf-cookie");
	// } catch (e) {
	//   console.error(e);
	// }
}

export { axios, setCredentials };
