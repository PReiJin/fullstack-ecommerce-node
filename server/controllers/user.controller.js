import expressAsyncHandler from 'express-async-handler'
import { generateToken } from '../config/jwtToken.js'
import User from '../models/user.model.js'
import { validateActiveHandler } from '../utils/checkActive.js'


// create user
export const CreateUser = async (req, res) => {
  const email = req.body.email
  const findUser = await User.findOne({email}).select({password: 0})
  if (!findUser) {
    try{
    const {_id,firstname, lastname, email, mobile, role} = await User.create(req.body)
    res.json({firstname, lastname, email, mobile, role, token: generateToken(_id)})
    } catch (err) {
      res.status(400)
      res.json({message: err.message})
    }
  } else {
    res.status(400)
    return res.json({message: "User Existed"})
  }
}


// login {email, password}
export const LoginCtrl = async (req, res) => {
  const {email, password} = req.body
  const findUser = await User.findOne({email})
  validateActiveHandler(findUser, res)
  if (findUser && await findUser.isPassMatched(password)) {
    const {id, mobile, firstname, lastname, role} = findUser
    res.json({
      id, email, firstname, lastname, mobile, role,
      token: generateToken(id)
    })
  } else {
    res.status(403)
    return res.json({message:'Invalid Credentials'})
  }
}

// get all users
export const getAllUser = async (_, res) => {
  try {
    const listUsers = await User.find({active: true}).select({password: 0})
    res.json(listUsers)
  } catch (err) {
    res.status(500)
    return res.json({message: err.message})
  }
}

// get user by id 
export const getUserById =async (req, res) => {
  const {id} = req.params
  try {
    const findUser = await User.findById(id).select({password: 0})
    if (findUser) {
      res.json(findUser)
    } else {
      return res.status(404).json({message: 'Not found'})
    }
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}

// update user by id
export const updateUser = async (req, res) => {
  const {id} = req.params
  try {
    const {firstname, lastname, email, mobile, role} = req.body
    const updatedUser = await User.findByIdAndUpdate(id, {
      firstname, lastname, email, mobile, role
    }, {
      new: true
    }).select({password: 0})
    if(!updateUser) {
      res.status(404).json({message: 'User not existed'})
    } else {
      res.json(updatedUser)
    }
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}

// delete user by id 
export const deleteUserById = async (req, res) => {
  const {id} = req.params
  try {
    const userDeleted = await User.findByIdAndUpdate(id, {active: false}, {new: true})
    res.json(userDeleted)
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}


// ctrl update current user
export const updateCurrentUser = async (req, res) => {
  const {id} = req.params
  if (id == req.user?._id) {
      req.body.role = undefined
      updateUser(req, res)
  } else {
    return res.status(401).json({message:'user not permitted'})
  }
}

// ctrl delete current user
export const deleteCurrentUser = async (req, res) => {
  const {id} = req.params
  if (id == req.user?._id) {
      deleteUserById(req, res)
  } else {
    return res.status(401).json({message:'user not permitted'})
  }
}