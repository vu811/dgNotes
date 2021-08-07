import axios from 'axios'
import { TodoProps } from './todoSlice'

export const getTodos = (date: string) => {
  return axios.get(`/api/todos?date=${date}`)
}

export const addTodo = (payload: TodoProps) => {
  return axios.post('/api/todos', payload)
}

export const deleteTodo = (id: string) => {
  return axios.delete(`/api/todos/${id}`)
}
