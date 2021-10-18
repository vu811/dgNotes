import mongoose from 'mongoose'
import { versionSchema } from './version'

const Schema = mongoose.Schema

export const projectSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: [true, 'name is required']
    },
    startDate: {
      type: Date,
      required: [true, 'startDate is required']
    },
    description: {
      type: String
    },
    versions: {
      type: [versionSchema]
    }
  },
  {
    timestamps: true
  }
)

const Project = mongoose.model('Project', projectSchema)
export default Project
