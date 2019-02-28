import mongoose from 'mongoose'
import Schema from './UserSchema'

export default mongoose.model('User', Schema)
