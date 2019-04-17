import UsersModel from '../../models/users/UsersModel'
import ChatRequestsModel from '../../models/chat-requests/ChatRequestsModel'
import ChatsModel from '../../models/chats/ChatsModel'
import jwt from 'jsonwebtoken'

export const Register = (req, res) => {
  if (req.body.use_default_status_message) {
    delete req.body.status_message
  }
  UsersModel.create(req.body)
    .then(mongoUser => {
      const user = Object.assign({}, mongoUser._doc)
      delete user.password
      res.send(user)
    })
    .catch(error => {
      res.status(422).send(error)
    })
}

export const Login = (req, res) => {
  const { username, password } = req.body
  UsersModel.findOne({ username })
      .then(mongoUser => {
        if (!mongoUser) {
          res.status(422).send({ message: 'User does not exist.' })
        } else {
          mongoUser.validatePassword(password)
            .then(() => {
              const user = Object.assign({}, mongoUser._doc)
              delete user.password
              jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP }, (error, token) => {
                if (!error) {
                  res.send({ token })
                } else {
                  res.status(500).send(error)
                }
              })
            })
            .catch(error => {
              res.status(401).send({ message: 'Invalid password', error })
            })
        }
      })
      .catch(error => {
        res.status(422).send(error)
      })
}

export const getUserData = (req, res) => {
  UsersModel.findOne({ username: req.user.username }, { password: 0 })
    .then(user => {
      Promise.all([
        ChatsModel.find({ 'participants.username': user.username }),
        ChatRequestsModel.find({ $and: [ { 'to.username': user.username }, { status: 'pending' } ] })
      ])
        .then(data => {
          res.send({
            user,
            chats: data[0],
            chat_requests: data[1]
          })
        })
    })
    .catch(error => {
      res.status(422).send(error)
    })
}
