import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const taskSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, 'description is required']
    },
    status: {
      type: String,
      enum: {
        values: ['New', 'In-Progress', 'Done'],
        required: [true, 'status is required']
      }
    },
    dueDate: {
      type: String,
      required: [true, 'dueDate is required']
    }
  },
  {
    timestamps: true
  }
)

const Task = mongoose.model('Task', taskSchema)
export default Task
