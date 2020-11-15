import {axios} from '@/helpers/axiosConfig'

export const getAllUserGroupSubjects = async ()=> axios.get('/userGroupSubject')
export const getUserGroupSubject = async (id)=> axios.get(`/userGroupSubject/${id}`)
export const createUserGroupSubject = async (data)=> axios.post(`/userGroupSubject`,data)
export const updateUserGroupSubject = async (userGroupSubjectID,data)=> axios.put(`/userGroupSubject/${userGroupSubjectID}`,data)
export const deleteUserGroupSubject = async (userGroupSubjectID)=> axios.delete(`/userGroupSubject/${userGroupSubjectID}`)


