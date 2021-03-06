import { axios } from '@/helpers/axiosConfig';

export const getAllTests = async () => axios.get('/test');
export const getTest = async id => axios.get(`/test/${id}`);
export const createTest = async data => axios.post(`/test`, data);
export const updateTest = async (testID, data) =>
	axios.put(`/test/${testID}`, data);
export const deleteTest = async testID => axios.delete(`/test/${testID}`);

export const getTestsBySubject = async subjectID =>
	axios.get(`/test/subject/${subjectID}`);

export const getTestsBySubjectAndGroup = async (groupId, subjectId) =>
	axios.get(`/test/subjectAndGroup?groupId=${groupId}&subjectId=${subjectId}`);

export const getTestsByUserAndSubjectId = async (userId, subjectId) =>
	axios.get(`/test/userAndSubject?userId=${userId}&subjectId=${subjectId}`);
