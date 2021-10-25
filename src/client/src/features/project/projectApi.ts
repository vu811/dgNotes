import axios from '../../utils/httpHelper'
import { ProjectProps, TaskProps, VersionProps } from './projectSlice'

export const getProject = (id: String) => {
  return axios.get(`/api/projects/${id}`)
}

export const getProjects = (userId: string) => {
  return axios.get(`/api/projects?userId=${userId}`)
}

export const addProject = (payload: ProjectProps) => {
  return axios.post('/api/projects', payload)
}

export const addVersion = (id: String, payload: VersionProps) => {
  return axios.post(`/api/projects/${id}/versions`, payload)
}

export const addTask = (id: String, versionId: String, payload: TaskProps) => {
  return axios.post(`/api/projects/${id}/versions/${versionId}/tasks`, payload)
}

export const deleteTask = (id: String, versionId: String, taskId: String) => {
  return axios.delete(
    `/api/projects/${id}/versions/${versionId}/tasks/${taskId}`
  )
}

export const updateTask = (
  id: String,
  versionId: String,
  taskId: String,
  payload: any
) => {
  return axios.put(
    `/api/projects/${id}/versions/${versionId}/tasks/${taskId}`,
    payload
  )
}

export const deleteVersion = (id: String, versionId: String) => {
  return axios.delete(`/api/projects/${id}/versions/${versionId}`)
}

export const deleteProject = (id?: String) => {
  return axios.delete(`/api/projects/${id}`)
}

export const updateProject = (id: string, payload: ProjectProps) => {
  return axios.put(`/api/projects/${id}`, payload)
}

export const updateVersion = (id: String, payload: VersionProps) => {
  return axios.put(`/api/projects/${id}/versions/${payload._id}`, payload)
}
