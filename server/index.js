import express, { Router } from 'express'
import bodyParser from 'body-parser'

import { dbConnect } from './config/dbConfig.js'
import { ErrorHandler, NotFound } from './middleware/errorHandler.js'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'

import dotenv from 'dotenv'
dotenv.config()

const DB_URI = process.env.DB_URI
const PORT = process.env.PORT || 8080

dbConnect(DB_URI)
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/api/v1/user', authRoute, userRoute)
app.use(NotFound)
app.use(ErrorHandler)
app.listen(PORT, () => console.log(`server runniing ${PORT}`))
