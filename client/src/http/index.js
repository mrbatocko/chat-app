import axios from 'axios'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost'
}

axios.interceptors.request.use(config => {
  const token = localStorage['chat-token']
  if (token && token.length) {
    config.headers.common['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

export async function transformedResponse (promise) {
  return await promise
    .then(response => {
      return response.data ? response.data : response
    })
    .catch(error => {
      return error.response && error.response.data ? Promise.reject(error.response.data) : Promise.reject(error.response)
    })
}

export const apiUrl = 'http://localhost'
export const socketUrl = 'http://localhost:3000'