import axios from 'axios'
import { ProjectProps, VersionProps } from './projectSlice'

export const getProject = (id: string) => {
  return axios.get(`/api/projects/${id}`)
}

export const getProjects = () => {
  return axios.get('/api/projects')
}

export const addProject = (payload: ProjectProps) => {
  return axios.post('/api/projects', payload)
}

export const addVersion = (id: string, payload: VersionProps) => {
  return axios.post(`/api/projects/${id}/versions`, payload)
}
