import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addGoal, deleteGoal, getGoals } from './goalApi'

export interface GoalState {
  isOpenGoalModal: boolean
  goals: GoalResProps[]
}

export interface GoalProps {
  goalType: number
  objectiveType: number
  revision?: number
  goal: string
  plan?: string
}

export interface GoalResProps extends GoalProps {
  _id: string
}

const initialState: GoalState = {
  isOpenGoalModal: false,
  goals: []
}

export const getGoalsAsync = createAsyncThunk(
  'getGoal',
  async (goalType: number) => {
    const response = await getGoals(goalType)
    return response.data
  }
)

export const addGoalAsync = createAsyncThunk(
  'addGoal',
  async (payload: GoalProps) => {
    const response = await addGoal(payload)
    return response.data
  }
)

export const deleteGoalAsync = createAsyncThunk(
  'deleteGoal',
  async (id: string) => {
    const response = await deleteGoal(id)
    return response.data
  }
)

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    openGoalModal: (state) => {
      state.isOpenGoalModal = true
    },
    closeGoalModal: (state) => {
      state.isOpenGoalModal = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoalsAsync.fulfilled, (state, action) => {
        state.goals = action.payload
      })
      .addCase(addGoalAsync.fulfilled, (state, action) => {
        state.goals.push(action.payload)
        state.isOpenGoalModal = false
      })
      .addCase(deleteGoalAsync.fulfilled, (state, action) => {
        state.goals = state.goals.filter((t) => t._id !== action.payload._id)
      })
  }
})

export const { openGoalModal, closeGoalModal } = goalSlice.actions
export default goalSlice.reducer
