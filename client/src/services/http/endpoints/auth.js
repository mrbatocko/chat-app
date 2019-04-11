import { APP_AXIOS_INSTANCE as ajaxModule } from '..'
// import { transformedResponse } from '..'
import toResponse from '../awaitResponse'

export const register = async user => {
  const [ error, data ] = await toResponse(ajaxModule.post('/users/register', user))
  console.log(error, data)
}

export const login = async user => {
  const [ error, data ] = await toResponse(ajaxModule.post('/users/login', user))
  return { token: !error ? data.data.token : false }
}
