import UsersModel from '../../../models/users/UsersModel'

export const seedUsers = (users) => {
  return new Promise((resolve, reject) => {
    Promise.all(users.map(user => {
      let userDoc = new UsersModel(user)
      return userDoc.save()
    }))
      .then(() => {
        resolve()
      })
      .catch(() => {
        reject()
      })
  })
}