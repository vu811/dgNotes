import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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
  updateTask,
  updateProject,
  updateVersion
} from './projectApi'
export interface ProjectDetailProps extends ProjectProps {
  versions: VersionFullProps[]
}
export interface TaskProps {
  _id?: string
  description: string
  dueDate: Date
  startDate: Date
  completedDate: Date
}
export interface VersionProps {
  _id?: string
  name: string
  startDate: Date | null
  description: string
}
export interface VersionFullProps extends VersionProps {
  tasks: TaskProps[]
}
export interface VersionPayload {
  id: string
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
  isStarted?: boolean
  isCompleted?: boolean
  description?: string
  dueDate?: Date
}
export interface ProjectProps {
  _id?: string
  userId?: string
  name: string
  startDate: Date
  description: string
}
export interface ProjectState {
  isOpenProjectModal: boolean
  isOpenVersionModal: boolean
  isOpenTaskModal: boolean
  projects: ProjectProps[]
  projectDetail: ProjectDetailProps | null
  task: TaskProps | null
  version: VersionProps | null
}

const initialState: ProjectState = {
  isOpenProjectModal: false,
  isOpenVersionModal: false,
  isOpenTaskModal: false,
  projects: [],
  projectDetail: null,
  task: null,
  version: null
}

export const getProjectsAsync = createAsyncThunk(
  'project/get',
  async (userId: string) => {
    const response = await getProjects(userId)
    return response.data
  }
)

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

export const updateProjectAsync = createAsyncThunk(
  'project/update',
  async (payload: ProjectProps) => {
    const response = await updateProject(payload._id ?? '', payload)
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
    const {
      projectId,
      versionId,
      taskId,
      isStarted,
      isCompleted,
      description,
      dueDate
    } = payload
    const response = await updateTask(projectId, versionId, taskId, {
      isStarted,
      isCompleted,
      description,
      dueDate
    })
    return response.data
  }
)

export const updateVersionAsync = createAsyncThunk(
  'project/updateVersion',
  async (payload: VersionPayload) => {
    const { id, version } = payload
    const response = await updateVersion(id, version)
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
  async (id?: string) => {
    const response = await deleteProject(id)
    return response.data
  }
)

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    openProjectModal: (state, action) => {
      state.isOpenProjectModal = true
      if (action.payload.isAddNew) {
        state.projectDetail = null
      }
    },
    closeProjectModal: (state) => {
      state.isOpenProjectModal = false
    },
    openVersionModal: (state, action) => {
      state.isOpenVersionModal = true
      if (action.payload) {
        state.version = action.payload
      }
    },
    closeVersionModal: (state) => {
      state.isOpenVersionModal = false
    },
    openTaskModal: (state, action) => {
      state.isOpenTaskModal = true
      if (action.payload) {
        state.task = action.payload
      }
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
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        const { _id, name, startDate, description } = action.payload
        const updatedProjects = state.projects.map((project) => {
          if (project._id === _id) {
            project.name = name
            project.startDate = startDate
            project.description = description
          }
          return project
        })
        state.projects = updatedProjects
        state.isOpenProjectModal = false
      })
      .addCase(updateVersionAsync.fulfilled, (state, action) => {
        state.projectDetail = action.payload
        state.isOpenVersionModal = false
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
