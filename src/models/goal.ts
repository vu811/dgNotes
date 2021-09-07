import mongoose from 'mongoose'
import { GoalEnum } from '../enums/goalEnum'

const Schema = mongoose.Schema

export const goalSchema = new Schema(
  {
    type: {
      type: Number,
      enum: GoalEnum,
      default: 1
    },
    revision: {
      type: Number,
      required: [true, 'revision is required'],
      default: 1
    },
    goal: {
      type: String,
      required: [true, 'goal is required']
    },
    plan: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Goal = mongoose.model('Goal', goalSchema)
export default Goal
