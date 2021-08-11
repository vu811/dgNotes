import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getProjects, addProject, addVersion, getProject } from './projectApi'

export interface ProjectState {
  isOpenProjectModal: boolean
  isOpenVersionModal: boolean
  projects: ProjectProps[]
  projectDetail: ProjectDetailProps | null
}

export interface ProjectProps {
  _id?: string
  name: String
  startDate: Date
  description: String
}

export interface ProjectDetailProps extends ProjectProps {
  versions: VersionProps[]
}

export interface VersionProps {
  name: String
  startDate: Date | null
  description: String
}

export interface VersionPayload {
  id: string
  versions: VersionProps
}

const initialState: ProjectState = {
  isOpenProjectModal: false,
  isOpenVersionModal: false,
  projects: [],
  projectDetail: null
}

export const getProjectsAsync = createAsyncThunk('project/get', async () => {
  const response = await getProjects()
  return response.data
})

export const getProjectAsync = createAsyncThunk(
  'project/getById',
  async (id: string) => {
    const response = await getProject(id)
    return response.data
  }
)

export const addProjectAsync = createAsyncThunk(
  'project/add',
  async (payload: ProjectProps) => {
    const response = await addProject(payload)
    return response.data
  }
)

export const addVersionAsync = createAsyncThunk(
  'project/addVersion',
  async (payload: VersionPayload) => {
    const response = await addVersion(payload.id, payload.versions)
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
    },
    openVersionModal: (state) => {
      state.isOpenVersionModal = true
    },
    closeVersionModal: (state) => {
      state.isOpenVersionModal = false
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
      .addCase(getProjectAsync.fulfilled, (state, action) => {
        state.projectDetail = action.payload
      })
  }
})

export const {
  openProjectModal,
  closeProjectModal,
  openVersionModal,
  closeVersionModal
} = projectSlice.actions

export const selectProjects = (state: RootState) => state.project.projects

export default projectSlice.reducer
