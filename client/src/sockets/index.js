import { socketUrl } from '@/http'
import io from 'socket.io-client'

export const connectToRoom = (room, options) => {
  return io(`${socketUrl}/${room}`, options)
}