import axios from 'axios'
import { ProjectProps, TaskProps, VersionProps } from './projectSlice'

export const getProject = (id: String) => {
  return axios.get(`/api/projects/${id}`)
}

export const getProjects = () => {
  return axios.get('/api/projects')
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

export const deleteVersion = (id: String, versionId: String) => {
  return axios.delete(`/api/projects/${id}/versions/${versionId}`)
}

export const deleteProject = (id?: String) => {
  return axios.delete(`/api/projects/${id}`)
}
