import axios from 'axios'

const axiosConfig = axios.create({
  baseURL: 'https://api.autopi.io',
})

axiosConfig.interceptors.request.use(
  (config) => {
    //const { token } = store.getState().user
    const token = '122ccc60fc4f8cd41c95209db2fdc56a9ee43d83'
    if (token) {
      //config.headers.Authorization = `Bearer ${token}`
      config.headers.Authorization = `APIToken ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosConfig
