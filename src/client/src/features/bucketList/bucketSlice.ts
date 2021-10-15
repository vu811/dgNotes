import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  addBucket,
  completeBucket,
  deleteBucket,
  getBucket,
  getBucketList,
  updateBucket
} from './bucketApi'

export interface BucketState {
  isOpenBucketModal: boolean
  bucketList: Array<BucketResProps>
  bucket: BucketResProps | null
}

export interface BucketProps {
  description: string
  completedDate?: Date
}

export interface BucketResProps extends BucketProps {
  _id: string
}

const initialState: BucketState = {
  isOpenBucketModal: false,
  bucketList: [],
  bucket: null
}

export const getBucketAsync = createAsyncThunk(
  'bucketList/getBucketById',
  async (id: string) => {
    const response = await getBucket(id)
    return response.data
  }
)

export const addBucketAsync = createAsyncThunk(
  'bucketList/add',
  async (payload: BucketProps) => {
    const response = await addBucket(payload)
    return response.data
  }
)

export const getBucketListAsync = createAsyncThunk(
  'bucketList/getAll',
  async () => {
    const response = await getBucketList()
    return response.data
  }
)

export const updateBucketAsync = createAsyncThunk(
  'bucketList/update',
  async (payload: BucketResProps) => {
    const response = await updateBucket(payload._id, payload)
    return response.data
  }
)

export const deleteBucketAsync = createAsyncThunk(
  'bucketList/delete',
  async (id: string) => {
    const response = await deleteBucket(id)
    return response.data
  }
)

export const completeBucketAsync = createAsyncThunk(
  'bucketList/complete',
  async (id: string) => {
    const response = await completeBucket(id)
    return response.data
  }
)

export const bucketSlice = createSlice({
  name: 'bucket',
  initialState,
  reducers: {
    openBucketModal: (state, action) => {
      state.isOpenBucketModal = true
      if (action.payload.isAddNew) {
        state.bucket = null
      }
    },
    closeBucketModal: (state) => {
      state.isOpenBucketModal = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBucketListAsync.fulfilled, (state, action) => {
        state.bucketList = action.payload
      })
      .addCase(addBucketAsync.fulfilled, (state, action) => {
        state.bucketList.push(action.payload)
        state.isOpenBucketModal = false
      })
      .addCase(deleteBucketAsync.fulfilled, (state, action) => {
        state.bucketList = state.bucketList.filter(
          (t) => t._id !== action.payload._id
        )
      })
      .addCase(getBucketAsync.fulfilled, (state, action) => {
        state.bucket = action.payload
      })
      .addCase(updateBucketAsync.fulfilled, (state, action) => {
        const { _id, description } = action.payload
        const updatedBucketList = state.bucketList.map((bucket) => {
          if (bucket._id === _id) {
            bucket.description = description
          }
          return bucket
        })
        state.bucketList = updatedBucketList
        state.isOpenBucketModal = false
      })
      .addCase(completeBucketAsync.fulfilled, (state, action) => {
        const { _id, completedDate } = action.payload
        const updatedBucketList = state.bucketList.map((bucket) => {
          if (bucket._id === _id) {
            bucket.completedDate = completedDate
          }
          return bucket
        })
        state.bucketList = updatedBucketList
      })
  }
})

export const { openBucketModal, closeBucketModal } = bucketSlice.actions
export default bucketSlice.reducer
