import axios from 'axios'
import { GoalProps } from './goalSlice'

export const getGoals = (goalType: number) => {
  return axios.get(`/api/goals?type=${goalType}`)
}

export const addGoal = (payload: GoalProps) => {
  return axios.post('/api/goals', payload)
}

export const deleteGoal = (id: string) => {
  return axios.delete(`/api/goals/${id}`)
}
