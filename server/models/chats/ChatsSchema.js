import { Schema } from 'mongoose'

const ChatSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
})

export default ChatSchema