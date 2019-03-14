import mongoose from 'mongoose'
import timestamp from 'mongoose-timestamp'
import bcrypt from 'bcrypt'

const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  online: {
    type: Boolean,
    default: false
  },
  status_message: {
    type: String,
    minlength: 5,
    maxlength: 40,
    default: 'Hi there. I\'m using chatapp.'
  },
  status: {
    type: String,
    enum: [ 'available', 'away', 'do-not-disturb' ],
    default: 'available'
  },
  avatar: {
    type: String
  }
})

UserSchema.plugin(timestamp)

UserSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    next()
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) {
        next(err) 
      } else {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            next(err)
          } else {
            user.password = hash
            next()
          }
        }) 
      }
    })
  }
})

UserSchema.methods.validatePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (error, valid) => {
      if (error) {
        reject(error)
      } else if (valid) {
        resolve()
      } else {
        reject({ message: 'Password is incorrect.' })
      }
  });
  })
}

export default UserSchema