import axios from 'axios'

const axiosApiInstance = axios.create()

axiosApiInstance.interceptors.request.use(
  async (request) => {
    console.log('cookie', request)
    return request
  },
  (error) => {
    Promise.reject(error)
  }
)

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    console.log(error)
    if (error.response.status === 401) {
      console.log('ko co quyen!')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export default axiosApiInstance
