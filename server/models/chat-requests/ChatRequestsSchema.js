import { Schema } from 'mongoose'

export default new Schema({
  from: {
    type: Object,
    required: true
  },
  to: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    enum: [ 'approved', 'pending', 'denied' ],
    default: 'pending'
  }
})
