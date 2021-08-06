import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getProjects, addProject } from './projectApi'

export interface ProjectState {
  isOpenProjectModal: boolean
  projects: Array<ProjectProps>
}

export interface ProjectProps {
  name: String
  startDate: Date
  description: String
}

const initialState: ProjectState = {
  isOpenProjectModal: false,
  projects: []
}

export const getProjectsAsync = createAsyncThunk('project/get', async () => {
  const response = await getProjects()
  return response.data
})

export const addProjectAsync = createAsyncThunk(
  'project/add',
  async (payload: ProjectProps) => {
    const response = await addProject(payload)
    return response.data
  }
)

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    openProjectModal: (state) => {
      state.isOpenProjectModal = true
    },
    closeProjectModal: (state) => {
      state.isOpenProjectModal = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectsAsync.fulfilled, (state, action) => {
        state.projects = action.payload
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.projects.push(action.payload)
        state.isOpenProjectModal = false
      })
  }
})

export const { openProjectModal, closeProjectModal } = projectSlice.actions

export const selectProjects = (state: RootState) => state.project.projects

export default projectSlice.reducer
