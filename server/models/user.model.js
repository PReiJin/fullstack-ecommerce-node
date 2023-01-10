import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // 0-user 1-admin
  role: {
    type: Number,
    required: true,
    default: 0
  },
  active : {
    type: Boolean,
    required: true,
    default: true
  },
  refresh_token: [{type: String}]
}, {
  timestamps: true
})

userSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  return next()
})

userSchema.methods.isPassMatched = async function (enterPass) {
  return await bcrypt.compare(enterPass, this.password)
}
export default model('User', userSchema)
