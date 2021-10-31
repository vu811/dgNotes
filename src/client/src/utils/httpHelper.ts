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
    if (error.response.status === 401) {
      const loginPath = '/auth/login'
      if (window.location.pathname !== loginPath) {
        window.location.href = loginPath
      }
    }
    return Promise.reject(error)
  }
)

export default axiosApiInstance
