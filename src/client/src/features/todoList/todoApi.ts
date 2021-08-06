import axios from 'axios'
import { TodoProps } from './todoSlice'

export const getTodos = (date: String) => {
  return axios.get(`/api/todos?date=${date}`)
}

export const addTodo = (payload: TodoProps) => {
  return axios.post('/api/todos', payload)
}
