import { axios } from '@/helpers/axiosConfig';

// export const getAllTests = async () => axios.get('/test');
// export const getTest = async id => axios.get(`/test/${id}`);
// export const createTest = async data => axios.post(`/test`, data);
// export const updateTest = async (testID, data) =>
// 	axios.put(`/test/${testID}`, data);
// export const deleteTest = async testID => axios.delete(`/test/${testID}`);
//
// export const getTestsBySubject = async subjectID =>
// 	axios.get(`/test/subject/${subjectID}`);
export const getGenerateTestByUser = async userId =>
	axios.get(`/generateTest/user/${userId}`);
export const createGenerateTest = async testId =>
	axios.get(`/task/generateTest?testId=${testId}&amountTasks=20`);
