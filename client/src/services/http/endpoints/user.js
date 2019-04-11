import { APP_AXIOS_INSTANCE } from '..'
// import { transformedResponse } from '../index'
import toResponse from '../awaitResponse'

export const getUserData = async () => {
  const [ error, data ] = await toResponse(APP_AXIOS_INSTANCE.get('/users'))
  return { data: !error ? data.data : false }
}