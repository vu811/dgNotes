import axios from '../../utils/httpHelper'
import { GoalProps } from './goalSlice'

export const getGoal = (id: string) => {
  return axios.get(`/api/goals/${id}`)
}

export const getGoals = (goalType: number) => {
  return axios.get(`/api/goals?type=${goalType}`)
}

export const addGoal = (payload: GoalProps) => {
  return axios.post('/api/goals', payload)
}

export const updateGoal = (id: string, payload: GoalProps) => {
  return axios.put(`/api/goals/${id}`, payload)
}

export const deleteGoal = (id: string) => {
  return axios.delete(`/api/goals/${id}`)
}

export const completeGoal = (id: string) => {
  return axios.put(`/api/goals/${id}/complete`)
}
