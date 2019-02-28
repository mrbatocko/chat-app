import SocketIOServer from 'socket.io'

import { chatMetaConnectionsHandle } from '../controllers/chats/ChatsCtrl'

export default server => {
  const io = SocketIOServer(server, { serveClient: false })
  io.origins(['localhost:3001'])

  chatMetaConnectionsHandle(io.of('/meta'))
}