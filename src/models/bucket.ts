import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const bucketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    description: {
      type: String,
      required: [true, 'description is required']
    },
    completedDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

const Bucket = mongoose.model('Bucket', bucketSchema)
export default Bucket
