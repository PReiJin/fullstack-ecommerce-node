import jwt from 'jsonwebtoken'

export const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '2h'})

export const generateRefreshToken = (id) => jwt.sign({id}, process.env.JWT_REFRESH_SECRET, {expiresIn: '1m'})