import { TodoProps } from './todoSlice'
import axios from '../../utils/httpHelper'

export const getTodos = (userId: string, date: string) => {
  return axios.get(`/api/todos?userId=${userId}&date=${date}`)
}

export const addTodo = (payload: TodoProps) => {
  return axios.post('/api/todos', payload)
}

export const getTodoById = (id: string) => {
  return axios.get(`/api/todos/${id}`)
}

export const updateTodo = (id: string, payload: TodoProps) => {
  return axios.put(`/api/todos/${id}`, payload)
}

export const completeTodo = (id: string) => {
  return axios.put(`/api/todos/${id}/complete`)
}

export const deleteTodo = (id: string) => {
  return axios.delete(`/api/todos/${id}`)
}
