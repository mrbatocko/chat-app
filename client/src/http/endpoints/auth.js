import axios from 'axios'
import { transformedResponse } from '..'

export const authRegister = user => {
  return transformedResponse(axios.post('/users/register', user))
}

export const authLogin = user => {
  return transformedResponse(axios.post('/users/login', user))
}