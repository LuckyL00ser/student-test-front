import { axios } from '@/helpers/axiosConfig';


export const getGenerateTaskByGenerateTestId = async testId =>
	axios.get(`/generateTask/generateTest/${testId}`);
