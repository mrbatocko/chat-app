import ChatModel from '../../models/chats/ChatsModel'
import UserModel from '../../models/users/UsersModel'
import ChatRequestsModel from '../../models/chat-requests/ChatRequestsModel'

const OFFLINE_TIMEOUT = 5000 // Prevent going offline after disconnect event for this amount of time
let OFFLINE_TIMEOUT_HANDLE = null

export default connectionSocket => {
  connectionSocket.on('connection', socket => {
    if (socket.handshake.query.username) {
      socket.join(socket.handshake.query.username)
      clearTimeout(OFFLINE_TIMEOUT_HANDLE)
      UserModel.findOne({ username: socket.handshake.query.username })
          .then(user => {
            if (!user.online) {
              user.online = true
              user.save()
            }
          })
          .catch(error => {
            cb(error)
          })
    }
    socket.on('disconnect', () => {
      OFFLINE_TIMEOUT_HANDLE = setTimeout(() => {
        UserModel.findOne({ username: socket.handshake.query.username })
          .then(user => {
            user.online = false
            user.save()
          })
          .catch(error => {
            cb(error)
          })
      }, OFFLINE_TIMEOUT)
    })
    socket.on('get-chat-data', ({ username }, cb) => {
      Promise.all([
        UserModel.findOne({ username }, { password: 0 }),
        ChatModel.findOne({ 'participants.username': username })
      ])
        .then(data => {
          cb(null, { user: data[0], chat: data[1] })
        })
    })
    socket.on('status-message-change', ({ status_message, username }, cb) => {
      if (username) {
        UserModel.findOne({ username })
          .then(user => {
            user.status_message = status_message
            user.save()
              .then(() => {
                cb(null)
              })
              .catch(error => {
                cb(error)
              })
          })
          .catch(error => {
            cb(error)
          })
      } else {
        cb(new Error('Please provide a username.'))
      }
    })
    socket.on('search-users', ({ username }, cb) => {
      if (username) {
        UserModel.find({ username: new RegExp(username, 'i') }, 'username avatar')
          .then(users => {
            cb(null, users)
          })
          .catch(error => {
            cb(error)
          })
      } else {
        cb(new Error('Please provide a username.'))
      }
    })
    socket.on('chat-request', ({ from, to }, cb) => {
      if (from && from.username && from.avatar && to && to.username && to.avatar) {
        ChatRequestsModel.create({ from, to })
          .then(request => {
            socket.to(to.username).emit('chat-request', request)
            cb()
          })
      } else {
        cb(new Error('Please provide a from and to params.'))
      }
    })
    socket.on('chat-request-action', ({ requestData, action }, cb) => {
      if (requestData.from && requestData.to && action) {
        ChatRequestsModel.findOne({ $and: [ { 'from.username': requestData.from.username }, { 'to.username': requestData.to.username } ] })
          .then(request => {
            if (action === 'approve') {
              ChatModel.create({ participants: [ requestData.from, requestData.to ]})
                .then(chat => {
                  request.status = 'approved'
                  request.save()
                  cb(null, chat)
                  socket.to(requestData.from.username).emit('request-approved', chat)
                })
            } else {
              request.status = 'denied'
              request.save()
              cb(null, false)
            }
          })
      } else {
        cb(new Error('Please provide a valid data.'))
      }
    })
  })
}