import ChatModel from '../../models/chats/ChatsModel'
import UserModel from '../../models/users/UsersModel'

const OFFLINE_TIMEOUT = 5000 // Prevent going offline after disconnect event for this amount of time
let OFFLINE_TIMEOUT_HANDLE = null

export const getUserChats = (req, res) => {
  ChatModel.find({ from: req.user.username })
    .then(chats => {
      res.send({ chats })
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

export const chatMetaConnectionsHandle = connectionSocket => {
  connectionSocket.on('connection', socket => {
    if (socket.handshake.query.username) {
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
    socket.on('status-change', ({ status, username }, cb) => {
      if (username) {
        UserModel.findOne({ username })
          .then(user => {
            user.status = status
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
    socket.on('search-user', (username, cb) => {
      if (username) {
        UserModel.find({ username: new RegExp(username, 'i') })
          .then(mongoUsers => {
            let users = mongoUsers.map(mUser => {
              let user = Object.assign({}, mUser._doc)
              delete user.chats
              delete user.password
              return user
            })
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
      console.log(from)
      if (from && to) {
        UserModel.findOne({ username: to })
          .then(fromUser => {
            if (fromUser.chats) {
              let exists = fromUser.chats.includes(chat => chat.with._id === from._id)
              if (!exists) {
                fromUser.chats.push({ with: from, status: 'pending' })
              }
            } else {
              fromUser.chats = [{ with: from, status: 'pending' }]
            }
            fromUser.save()
              .then(() => {
                cb(null, true)
              })
              .catch(error => {
                cb(error)
              })
          })
          .catch(error => {
            console.log(error)
            cb(error)
          })
      } else {
        cb(new Error('Please provide a from and to usernames.'))
      }
    })
    socket.on('chat-request-action', ({ from, to, action }, cb) => {
      if (from && to && action) {
        UserModel.findOne({ username: to.username })
          .then(mongoUser => {
            const chats = mongoUser.chats.filter(chat => chat.with.username === from.username)
            if (chats && chats.length) {
              chats[0].status = action
              mongoUser.save()
                .then(() => {
                  cb()
                })
                .catch(error => {
                  cb(error)
                })
            } else {
              cb(new Error('Something happened.'))
            }
          })
          .catch(error => {
            cb(error)
          })
      } else {
        cb(new Error('Please provide a valid data.'))
      }
    })
  })
}