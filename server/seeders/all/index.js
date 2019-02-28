import connect from '../../db/openConnection'

import { seedUsers } from './users'

const users = [
  {
    username: 'mrbatocko',
    password: 'batocko93',
    role: 'ADMIN',
    status_message: 'Hello, world!',
    avatar: 'mrbatocko.jpeg'
  }, {
    username: 'vlada',
    password: 'vladakomren',
    avatar: 'vlada.jpeg'
  }
]

connect(() => {
  Promise.all([
    seedUsers(users)
  ])
    .then(() => {
      process.exit(0)
    })
    .catch(() => {
      process.exit(1)
    })
})