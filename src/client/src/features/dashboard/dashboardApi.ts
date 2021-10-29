import axios from '../../utils/httpHelper'

export const getDashboard = () => {
  return axios.get('/api/dashboard')
}
