import { axios } from '@/helpers/axiosConfig';

export const getAllTasks = async () => axios.get(`/task`);
export const getTask = async id => axios.get(`/task/${id}`);
export const createTask = async data => axios.post(`/task`, data);
export const updateTask = async (id, data) => axios.put(`/task/${id}`, data);
export const deleteTask = async id => axios.delete(`/task/${id}`);
