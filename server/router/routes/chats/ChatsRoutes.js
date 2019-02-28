import express from 'express'
import { getUserChats } from '../../../controllers/chats/ChatsCtrl'

const router = express.Router()

router.get('/', getUserChats)

export default router
