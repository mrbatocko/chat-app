import axios from 'axios'
import { transformedResponse } from '../../'

export const initializeChat = data => {
  return transformedResponse(axios.get('/chats', data))

}
