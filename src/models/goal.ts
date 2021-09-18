import mongoose from 'mongoose'
import { GoalType, ObjectiveType } from '../enums/goalEnum'

const Schema = mongoose.Schema

export const goalSchema = new Schema(
  {
    goalType: {
      type: Number,
      enum: GoalType,
      default: 0
    },
    objectiveType: {
      type: Number,
      enum: ObjectiveType,
      default: 0
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
