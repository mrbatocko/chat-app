import axios from 'axios'
import { transformedResponse } from '../../'

export const getUserData = () => {
  return transformedResponse(axios.get('/users'))
}