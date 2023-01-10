import mongoose from 'mongoose'

export const dbConnect = (dbUri) => {
  try {
    mongoose.set('strictQuery', false)
    const conn = mongoose.connect(dbUri)
    console.log('connected database')
  } catch (err) {
    console.log('error connect database ', err)
  }
}
