import axios from "axios"
import Cookies from "js-cookie"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("management_system_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("management_system_token")
      if (window.location.pathname !== "/") {
        window.location.href = "/"
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
