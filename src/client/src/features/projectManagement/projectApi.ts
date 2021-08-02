import axios from 'axios'
import { ProjectProps } from './projectSlice'

export const getProjects = () => {
  return axios.get('/api/projects')
}

export const addProject = (payload: ProjectProps) => {
  return axios.post('/api/projects', payload)
}
