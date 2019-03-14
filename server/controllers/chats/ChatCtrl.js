import ChatModel from '../../models/chats/ChatsModel'

export default  connectionSocket => {
  connectionSocket.on('connection', socket => {
    socket.on('get-chat-messages', (id, cb) => {
      ChatModel.findById(id)
        .then(chat => {
          cb(null, chat)
        })
        .catch(error => {
          cb(error)
        })
    })
    socket.on('chat-message', ({ chatId, from, to, message, sent_on }, cb) => {
      ChatModel.findById(chatId)
        .then(chat => {
          let messageToSave = {
            from: from.username,
            to: to.username,
            content: message,
            sent_on: sent_on,
            created_on: Date.now()
          }
          if (chat.messages && chat.messages.length) {
            chat.messages.push(messageToSave)
          } else {
            chat.messages = [ messageToSave ]
          }
          chat.save()
            .then(() => {
              socket.broadcast.emit('message-received', { message: messageToSave })
              cb(null, messageToSave)
            })
            .catch(error => {
              cb(error)
            })
        })
        .catch(error => {
          cb(error)
        })
    })
  })
}