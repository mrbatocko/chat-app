import mongoose from 'mongoose'
import ChatSchema from './ChatsSchema'

const ChatModel = mongoose.model('Chat', ChatSchema)

export default ChatModel