import { axios } from '@/helpers/axiosConfig';

export const getAllGenerateTest = async () => axios.get('/generateTest');
export const getGenerateTest = async id => axios.get(`/generateTest/${id}`);
// export const createTest = async data => axios.post(`/test`, data);
// export const updateTest = async (testID, data) =>
// 	axios.put(`/test/${testID}`, data);
// export const deleteTest = async testID => axios.delete(`/test/${testID}`);
//
// export const getTestsBySubject = async subjectID =>
// 	axios.get(`/test/subject/${subjectID}`);
export const getGenerateTestByUser = async userId =>
	axios.get(`/generateTest/user/${userId}`);
export const createGenerateTest = async (testId, userId, amount = 20) =>
	axios.get(
		`/task/generateTest?testId=${testId}&amountTasks=${amount}&userId=${userId}`,
	);
