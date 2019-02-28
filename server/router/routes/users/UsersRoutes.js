import express from 'express'
import {
  Register,
  Login,
  getUserData
} from '../../../controllers/users/UsersCtrl'
const router = express.Router()

router.post('/register', Register)
router.post('/login', Login)
router.get('/', getUserData)

export default router