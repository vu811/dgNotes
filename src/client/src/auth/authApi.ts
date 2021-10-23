import axios from '../utils/httpHelper'
import { LoginPayload, RegisterPayload } from './authSlice'

export const register = (payload: RegisterPayload) => {
  return axios.post('/api/auth/register', payload)
}

export const login = (payload: LoginPayload) => {
  return axios.post('/api/auth/login', payload)
}

export const getMe = () => {
  return axios.get('/api/auth/me')
}

export const logout = () => {
  return axios.get('/api/auth/logout')
}
