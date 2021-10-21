import axios from 'axios'
import { LoginPayload, RegisterPayload } from './authSlice'

export const register = (payload: RegisterPayload) => {
  return axios.post('/api/auth/register', payload)
}

export const login = (payload: LoginPayload) => {
  return axios.post('/api/auth/login', payload)
}

export const getMe = () => {
  const a = axios.get('/api/auth/me')
  console.log('a', a)
  return a
}
