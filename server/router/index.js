import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import jwt from 'express-jwt'

// Auth routes
import UsersRoutes from './routes/users/UsersRoutes'

// Chats routes
import ChatsRoutes from './routes/chats/ChatsRoutes'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.set('view engine', 'pug')

// Authenticate jwt
app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: [ '/users/register', '/users/login' ] }))

// Use /users routes
app.use('/users', UsersRoutes)

// Use /chats routes
app.use('/chats', ChatsRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app