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
  data: DashboardType | {}
}

const initialState: DashboardState = {
  data: {
    todo: [],
    bucketList: [],
    goalCompleted: [],
    goalPending: []
  }
}

export const getDashboardAsync = createAsyncThunk('dashboard/get', async () => {
  const response = await getDashboard()
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
