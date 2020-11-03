import {axios} from '@/helpers/axiosConfig'

export const getAllGroups = async ()=> axios.get('/group')
export const getGroup = async (id)=> axios.get(`/group/${id}`)
export const getStudentGroups = async(studentID) =>axios.get(`/group/student/${studentID}`)
export const getTeacherGroups = async (teacherID) =>axios.get(`group/teacher/${teacherID}`)

export const createGroup = async (data)=> axios.post(`/group`,data)
export const updateGroup = async (groupID,data)=> axios.put(`/group/${groupID}`,data)
export const deleteGroup = async (groupID)=> axios.delete(`/group/${groupID}`)
