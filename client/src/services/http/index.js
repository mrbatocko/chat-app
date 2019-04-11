import axios from 'axios'
import { API_URL } from './config'

export const APP_AXIOS_INSTANCE = axios.create({
  baseURL: API_URL
})

APP_AXIOS_INSTANCE.interceptors.request.use(config => {
  const token = localStorage['chat-token']
  if (token && token.length) {
    config.headers.common['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
