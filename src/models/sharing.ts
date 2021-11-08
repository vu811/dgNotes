import mongoose from 'mongoose'
import { SharingType } from '../enums/sharingEnum'

const Schema = mongoose.Schema

export const sharingSchema = new Schema(
  {
    type: {
      type: String,
      enum: SharingType,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    todoDate: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Sharing = mongoose.model('Sharing', sharingSchema)
export default Sharing
