import mongoose from 'mongoose'

const { DB_HOST, DB_PORT, DB_NAME } = process.env

// Function to connect to mongo server
export default (success) => {
  mongoose.connect(`${DB_HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true })
  mongoose.connection.once('open', success)
}