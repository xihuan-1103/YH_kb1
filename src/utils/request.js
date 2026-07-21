import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000
})

service.interceptors.response.use(
  response => response.data,
  error => {
    console.error('请求错误:', error.message)
    return Promise.reject(error)
  }
)

export default service
