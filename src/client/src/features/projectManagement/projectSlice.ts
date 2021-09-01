import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import {
  getProjects,
  addProject,
  addVersion,
  getProject,
  addTask,
  deleteTask,
  deleteVersion,
  deleteProject,
  updateTask
} from './projectApi'

export interface ProjectDetailProps extends ProjectProps {
  versions: VersionFullProps[]
}

export interface TaskProps {
  _id?: String
  description: String
  dueDate: Date
  startDate: Date
  completedDate: Date
}

export interface VersionProps {
  _id?: String
  name: String
  startDate: Date | null
  description: String
}

export interface VersionFullProps extends VersionProps {
  tasks: TaskProps[]
}

export interface VersionPayload {
  id: String
  version: VersionProps
}

export interface ProjectBasePayload {
  projectId: any
  versionId: any
}

export interface TaskPayload extends ProjectBasePayload {
  task: any
}

export interface DeleteTaskPayload extends ProjectBasePayload {
  taskId: any
}

export interface UpdateTaskPayload extends DeleteTaskPayload {
  isStarted: boolean
  isCompleted: boolean
}

export interface ProjectProps {
  _id?: String
  name: String
  startDate: Date
  description: String
}

export interface ProjectState {
  isOpenProjectModal: boolean
  isOpenVersionModal: boolean
  isOpenTaskModal: boolean
  projects: ProjectProps[]
  projectDetail: ProjectDetailProps | null
  loading?: boolean
}

const initialState: ProjectState = {
  isOpenProjectModal: false,
  isOpenVersionModal: false,
  isOpenTaskModal: false,
  projects: [],
  projectDetail: null,
  loading: undefined
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
    const response = await addVersion(payload.id, payload.version)
    return response.data
  }
)

export const addTaskAsync = createAsyncThunk(
  'project/addTask',
  async (payload: TaskPayload) => {
    const response = await addTask(
      payload.projectId,
      payload.versionId,
      payload.task
    )
    return response.data
  }
)

export const deleteTaskAsync = createAsyncThunk(
  'project/deleteTask',
  async (payload: DeleteTaskPayload) => {
    const response = await deleteTask(
      payload.projectId,
      payload.versionId,
      payload.taskId
    )
    return response.data
  }
)

export const updateTaskAsync = createAsyncThunk(
  'project/updateTask',
  async (payload: UpdateTaskPayload) => {
    const response = await updateTask(
      payload.projectId,
      payload.versionId,
      payload.taskId,
      {
        isStarted: payload.isStarted || false,
        isCompleted: payload.isCompleted || false
      }
    )
    return response.data
  }
)

export const deleteVersionAsync = createAsyncThunk(
  'project/deleteVersion',
  async (payload: ProjectBasePayload) => {
    const response = await deleteVersion(payload.projectId, payload.versionId)
    return response.data
  }
)

export const deleteProjectAsync = createAsyncThunk(
  'project/deleteProject',
  async (id?: String) => {
    const response = await deleteProject(id)
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
    },
    openTaskModal: (state) => {
      state.isOpenTaskModal = true
    },
    closeTaskModal: (state) => {
      state.isOpenTaskModal = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectsAsync.fulfilled, (state, action) => {
        state.projects = action.payload
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.projects = action.payload
        state.isOpenProjectModal = false
      })
      .addCase(getProjectAsync.fulfilled, (state, action) => {
        state.projectDetail = action.payload
      })
      .addCase(addVersionAsync.fulfilled, (state, action) => {
        state.projectDetail = action.payload
        state.isOpenVersionModal = false
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.projectDetail = action.payload
        state.isOpenTaskModal = false
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.projectDetail = action.payload
      })
      .addCase(deleteVersionAsync.fulfilled, (state, action) => {
        state.projectDetail = action.payload
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (x: any) => x._id !== action.payload._id
        )
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.projectDetail = action.payload
      })
  }
})

export const {
  openProjectModal,
  closeProjectModal,
  openVersionModal,
  closeVersionModal,
  openTaskModal,
  closeTaskModal
} = projectSlice.actions

export const selectProjects = (state: RootState) => state.project.projects

export default projectSlice.reducer
