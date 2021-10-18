import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const userSchema = new Schema(
  {
    name: {
      type: String
    },
    username: {
      type: String,
      required: [true, 'username is required']
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)
export default User
