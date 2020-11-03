import {axios} from '@/helpers/axiosConfig'

export const getAllSubjects = async ()=> axios.get('/subject')
export const getSubject = async (id)=> axios.get(`/subject/${id}`)
export const getStudentSubjects = async(studentID) =>axios.get(`/subject/student/${studentID}`)
export const getTeacherSubjects = async (teacherID) =>axios.get(`subject/teacher/${teacherID}`)

export const createSubject = async (data)=> axios.post(`/subject`,data)
export const updateSubject = async (subjectID,data)=> axios.put(`/subject/${subjectID}`,data)
export const deleteSubject = async (subjectID)=> axios.delete(`/subject/${subjectID}`)
