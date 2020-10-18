import { axios } from '@/helpers/axiosConfig';

export const getCompanies = async () => axios.get('api/companies');
export const getCompany = async companyID =>
	axios.get(`api/companies/${companyID}`);
export const createCompany = async companyData =>
	axios.post('api/companies', companyData);
export const updateCompany = async (companyID, companyData) =>
	axios.put(`api/companies/${companyID}`, companyData);
export const deleteCompany = async companyID =>
	axios.delete(`api/companies/${companyID}`);
