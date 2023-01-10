import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import userModel from '../models/user.model.js';
const authMiddleWare = asyncHandler( async (req, res, next) => {
  let token;
  if (req.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(' ')[1]
    try {
      if (token) {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const findUser = await userModel.findById(decode?.id).select({password: 0})
        if(!findUser) {
          res.status(404)
          throw new Error('User not found')
        } else {
          req.user = findUser
          next()
        }
      }
    } catch (err) {
      res.status(400)
      throw new Error('Token invalid. Please login again!')
    }
  } else {
    res.status(400)
    throw new Error('There is no token attached to header')
  }
})

export const isAdmin = (req, res, next) => {
  const check = req.user?.role == 1
  if (check) {
    next()
  } else {
    res.status(401)
    throw new Error('You must admin to access')
  }
}
   

export default authMiddleWare