import axios from '../../utils/httpHelper'

export const getDashboard = (userId: string, date: string) => {
  return axios.get(`/api/dashboard?userId=${userId}&date=${date}`)
}
