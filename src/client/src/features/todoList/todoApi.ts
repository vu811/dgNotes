import axios from 'axios'
import { TodoProps } from './todoSlice'

export const getTodos = (date: string) => {
  return axios.get(`/api/todos?date=${date}`)
}

export const addTodo = (payload: TodoProps) => {
  return axios.post('/api/todos', payload)
}

export const completeTodo = (id: string) => {
  return axios.put(`/api/todos/${id}/complete`)
}

export const deleteTodo = (id: string) => {
  return axios.delete(`/api/todos/${id}`)
}
