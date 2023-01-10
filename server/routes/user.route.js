import {Router} from 'express'
import { deleteCurrentUser, deleteUserById, getAllUser, getUserById, updateCurrentUser, updateUser } from '../controllers/user.controller.js'
import authMiddleWare, { isAdmin } from '../middleware/auth.middleware.js'

const router = Router()
// api none auth
router.get('/', getAllUser)
router.get('/:id', getUserById)

// api auth
const authRoute = Router()
authRoute.put('/:id', updateCurrentUser)
authRoute.delete('/:id', deleteCurrentUser)

// api admin
const adminRoute = Router()
adminRoute.put('/:id', updateUser)
adminRoute.delete('/:id', deleteUserById)

// combine route
router.use('/admin',authMiddleWare, isAdmin, adminRoute)
router.use('', authMiddleWare, authRoute)
export default router