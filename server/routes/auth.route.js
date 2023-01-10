import { CreateUser, LoginCtrl} from '../controllers/user.controller.js'
import {Router} from 'express'

const router = Router()
router.post('/register', CreateUser)
router.post('/login', LoginCtrl)

export default router