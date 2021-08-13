import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const taskSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, 'description is required']
    },
    dueDate: {
      type: Date,
      required: [true, 'dueDate is required']
    },
    startDate: {
      type: Date
    },
    completedDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

const Task = mongoose.model('Task', taskSchema)
export default Task
