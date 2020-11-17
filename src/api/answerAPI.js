import { axios } from '@/helpers/axiosConfig';

export const getAllAnswers = async () => axios.get(`/answer`);
export const addAnswer = async data => axios.post(`/answer`, data);
export const getAnswer = async id => axios.get(`/answer/${id}`);
export const editAnswer = async id => axios.put(`/answer/${id}`);
export const deleteAnswer = async id => axios.delete(`/answer/${id}`);
export const getAnswersByTaskId = async taskId =>
	axios.get(`/answer/task/${taskId}`);
