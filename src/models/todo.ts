import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const todoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    date: {
      type: String,
      required: [true, 'date is required']
    },
    time: {
      type: String
    },
    description: {
      type: String
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const Todo = mongoose.model('Todo', todoSchema)
export default Todo
