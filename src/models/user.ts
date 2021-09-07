import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required']
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)
export default User
