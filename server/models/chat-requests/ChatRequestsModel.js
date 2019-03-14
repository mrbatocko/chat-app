import mongoose from 'mongoose'
import Schema from './ChatRequestsSchema'

export default mongoose.model('ChatRequest', Schema)