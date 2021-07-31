import mongoose from 'mongoose'
import { versionSchema } from './version'

const Schema = mongoose.Schema

export const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required']
    },
    startDate: {
      type: Date,
      required: [true, 'startDate is required']
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
