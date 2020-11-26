import { axios } from '@/helpers/axiosConfig';

export const getAllResults = async () => axios.get(`/result`);
export const addResult = async data => axios.post(`/result`, data);
export const getResult = async id => axios.get(`/result/${id}`);
export const editResult = async (id,data) => axios.put(`/result/${id}`,data);
export const deleteResult = async id => axios.delete(`/result/${id}`);

export const addPointsToResult = async (points,resultId) =>
	axios.post(`/result/points?points=${points}&resultId=${resultId}`);

export const getResultWIthMarkListByUserIdAndSubjectName = async (groupId,isMark,subjectId,teacherId)=>
	axios.get(`/result/teacher/subject/group/isMark?groupId=${groupId}&isMark=${isMark}&subjectId=${subjectId}&teacherId=${teacherId}`);

export const sendTestAnswers = async(answerList,generateTestId,userId)=>
	axios.post(`/result/user/answerList?generateTestId=${generateTestId}&userId=${userId}`,answerList,{headers: {'Content-Type': 'application/json'}});

export const getNextTermResult = async(answerList,resultId)=>
	axios.get(`/result/user/answerList/nextTerm?answerList=${answerList}&resultId=${resultId}`)

export const getResultWithMarkListByUserIdAndSubjectName = async (isMark,subjectId,userId)=>
	axios.get(`/result/user/subject/isMark?isMark=${isMark}&subjectId=${subjectId}&userId=${userId}`)
