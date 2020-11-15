import { axios } from '@/helpers/axiosConfig';

export const getAllUsers = async () => axios.get('/user');
export const getUser = async id => axios.get(`/user/${id}`);
export const updateUser = async (userID, data) =>
	axios.put(`/user/${userID}`, data);
export const deleteTest = async userID => axios.delete(`/user/${userID}`);
