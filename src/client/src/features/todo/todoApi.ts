import { CopyTodoPayload, TodoProps } from './todoSlice'
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

export const copyTodo = (payload: CopyTodoPayload) => {
  return axios.post(
    `/api/todos/copy?userId=${payload.userId}&date=${payload.date}`,
    {
      fromDate: payload.fromDate,
      toDate: payload.toDate
    }
  )
}

export const clearTodos = (userId: string, date: string) => {
  return axios.delete(`/api/todos/clear?userId=${userId}&date=${date}`)
}

export const shareTodo = (userId: string, todoDate: string) => {
  return axios.get(`/api/todos/sharing?userId=${userId}&todoDate=${todoDate}`)
}

export const getSharingTodo = (id: string) => {
  return axios.get(`/api/todos/sharing/${id}`)
}
