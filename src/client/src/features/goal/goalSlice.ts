import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  addGoal,
  completeGoal,
  deleteGoal,
  getGoal,
  getGoals,
  updateGoal
} from './goalApi'

export interface GoalState {
  isOpenGoalModal: boolean
  goals: GoalResProps[]
  goal: GoalResProps | null
}

export interface GoalProps {
  userId?: string
  goalType: number
  objectiveType: number
  revision?: number
  goal: string
  plan?: string
}

export interface GoalResProps extends GoalProps {
  _id: string
  completedDate?: Date | null
}

export interface GetGoalsPayload {
  userId: string
  goalType: number
}

const initialState: GoalState = {
  isOpenGoalModal: false,
  goals: [],
  goal: null
}

export const getGoalAsync = createAsyncThunk(
  'goal/getById',
  async (id: string) => {
    const response = await getGoal(id)
    return response.data
  }
)

export const getGoalsAsync = createAsyncThunk(
  'goal/get',
  async (payload: GetGoalsPayload) => {
    const { userId, goalType } = payload
    const response = await getGoals(userId, goalType)
    return response.data
  }
)

export const addGoalAsync = createAsyncThunk(
  'goal/add',
  async (payload: GoalResProps) => {
    const response = await addGoal(payload)
    return response.data
  }
)

export const updateGoalAsync = createAsyncThunk(
  'goal/update',
  async (payload: GoalResProps) => {
    const response = await updateGoal(payload._id, payload)
    return response.data
  }
)

export const deleteGoalAsync = createAsyncThunk(
  'goal/delete',
  async (id: string) => {
    const response = await deleteGoal(id)
    return response.data
  }
)

export const completeGoalAsync = createAsyncThunk(
  'goal/complete',
  async (id: string) => {
    const response = await completeGoal(id)
    return response.data
  }
)

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    openGoalModal: (state, action) => {
      state.isOpenGoalModal = true
      if (action.payload.isAddNew) {
        state.goal = null
      }
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
      .addCase(getGoalAsync.fulfilled, (state, action) => {
        state.goal = action.payload
      })
      .addCase(updateGoalAsync.fulfilled, (state, action) => {
        const { _id, goalType, objectiveType, goal, plan } = action.payload
        const newGoals = state.goals.map((goalItem) => {
          if (goalItem._id === _id) {
            goalItem.goalType = goalType
            goalItem.objectiveType = objectiveType
            goalItem.goal = goal
            goalItem.plan = plan
          }
          return goalItem
        })
        state.goals = newGoals
        state.isOpenGoalModal = false
      })
      .addCase(completeGoalAsync.fulfilled, (state, action) => {
        const { _id, completedDate } = action.payload
        const newGoals = state.goals.map((goalItem) => {
          if (goalItem._id === _id) {
            goalItem.completedDate = completedDate
          }
          return goalItem
        })
        state.goals = newGoals
      })
  }
})

export const { openGoalModal, closeGoalModal } = goalSlice.actions
export default goalSlice.reducer
