import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const todoSchema = new Schema(
  {
    date: {
      type: String,
      required: [true, 'startDate is required']
    },
    time: {
      type: String
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Todo = mongoose.model('Todo', todoSchema)
export default Todo