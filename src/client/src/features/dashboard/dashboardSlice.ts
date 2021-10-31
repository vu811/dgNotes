import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getDashboard } from './dashboardApi'

export interface DashboardType {
  todo: Array<number>
  bucketList: Array<number>
  goalCompleted: Array<number>
  goalPending: Array<number>
}

export interface DashboardState {
  data: DashboardType | null
}

export interface DashboardPayload {
  userId: string
  date: string
}

const initialState: DashboardState = {
  // data: {
  //   todo: [],
  //   bucketList: [],
  //   goalCompleted: [],
  //   goalPending: []
  // }
  data: null
}

export const getDashboardAsync = createAsyncThunk('dashboard/get', async (payload: DashboardPayload) => {
  const { userId, date } = payload
  const response = await getDashboard(userId, date)
  return response.data
})

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDashboardAsync.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export const selectDashboard = (state: RootState) => state.dashboard.data
export default dashboardSlice.reducer
