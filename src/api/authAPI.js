import { axios } from '@/helpers/axiosConfig';

export const signup = async (data) =>
	axios.post('/api/auth/signup', data);

export const signin = async (data) =>
	axios.post('/api/auth/signin', data);

export const refresh = async () =>
	axios.get('/api/auth/refreshtoken');

export const expiration = async () =>
	axios.post('/api/auth/expiration');


