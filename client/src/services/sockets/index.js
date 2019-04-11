import { socketUrl } from './config'
import io from 'socket.io-client'

export const connectToNamespace = (nps, options) => {
  return io(`${socketUrl}/${nps}`, options)
}