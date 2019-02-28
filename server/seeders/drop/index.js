import mongoose from 'mongoose'
import connect from '../../db/openConnection'

connect(() => {
  mongoose.connection.dropDatabase()
    .then(() => {
      mongoose.disconnect()
        .then(() => {
          process.exit(0)
        })
        .catch(error => {
          console.error('Cannot disconnect from db', error)
          process.exit(1)
        })
    })
    .catch(error => {
      console.error('Cannot drop db', error)
      process.exit(1)
    })
})
