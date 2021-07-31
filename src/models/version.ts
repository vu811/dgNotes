import mongoose from 'mongoose'
import { taskSchema } from './task'

const Schema = mongoose.Schema

export const versionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required']
    },
    description: {
      type: String
    },
    tasks: {
      type: [taskSchema]
    },
    status: {
      type: String
    },
    releaseDate: {
      type: Date,
      required: [true, 'releaseDate is required']
    }
  },
  {
    timestamps: true
  }
)

const Version = mongoose.model('Version', versionSchema)
export default Version
