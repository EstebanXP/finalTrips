import axios from 'axios'
import store from '../Redux/Store'

const axiosConfig = axios.create({
  baseURL: 'https://api.autopi.io',
})

axiosConfig.interceptors.request.use(
  (config) => {
    const { token } = store.getState().user

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosConfig
