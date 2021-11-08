import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getTodos,
  addTodo,
  deleteTodo,
  completeTodo,
  getTodoById,
  updateTodo,
  copyTodo,
  clearTodos,
  shareTodo,
  getSharingTodo
} from './todoApi'

export interface TodoState {
  isOpenTodoModal: boolean
  isOpenCopyModal: boolean
  isOpenClearTodoConfirmModal: boolean
  todos: Array<TodoProps>
  todo: TodoProps | null
}
export interface TodoProps {
  _id?: string
  userId?: string
  date: string
  time: string
  description: string
  isCompleted?: boolean
}

export interface GetTodoPayload {
  userId: string
  date: string
}

export interface CopyTodoPayload extends GetTodoPayload {
  fromDate: Date | null
  toDate: Date | null
}

const initialState: TodoState = {
  isOpenTodoModal: false,
  isOpenCopyModal: false,
  isOpenClearTodoConfirmModal: false,
  todos: [],
  todo: null
}

export const getTodoByIdAsync = createAsyncThunk(
  'todo/getById',
  async (id: string) => {
    const response = await getTodoById(id)
    return response.data
  }
)

export const updateTodoAsync = createAsyncThunk(
  'todo/update',
  async (payload: TodoProps) => {
    const response = await updateTodo(payload._id ?? '', payload)
    return response.data
  }
)

export const getTodosAsync = createAsyncThunk(
  'todo/get',
  async ({ userId, date }: GetTodoPayload) => {
    const response = await getTodos(userId, date)
    return response.data
  }
)

export const addTodoAsync = createAsyncThunk(
  'todo/add',
  async (payload: TodoProps) => {
    const response = await addTodo(payload)
    return response.data
  }
)

export const completeTodoAsync = createAsyncThunk(
  'todo/complete',
  async (id: string) => {
    const response = await completeTodo(id)
    return response.data
  }
)

export const deleteTodoAsync = createAsyncThunk(
  'todo/delete',
  async (id: string) => {
    const response = await deleteTodo(id)
    return response.data
  }
)

export const copyTodoAsync = createAsyncThunk(
  'todo/copy',
  async (payload: CopyTodoPayload) => {
    const response = await copyTodo(payload)
    return response.data
  }
)

export const clearTodosAsync = createAsyncThunk(
  'todo/clear',
  async ({ userId, date }: GetTodoPayload) => {
    const response = await clearTodos(userId, date)
    return response.data
  }
)

export const shareTodosAsync = createAsyncThunk(
  'todo/share',
  async ({ userId, date }: GetTodoPayload) => {
    const response = await shareTodo(userId, date)
    return response.data
  }
)

export const getSharingTodosAsync = createAsyncThunk(
  'todo/getSharing',
  async (id: string) => {
    const response = await getSharingTodo(id)
    return response.data
  }
)

export const projectSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    openTodoModal: (state, action) => {
      state.isOpenTodoModal = true
      if (action.payload.isAddNew) {
        state.todo = null
      }
    },
    closeTodoModal: (state) => {
      state.isOpenTodoModal = false
    },
    openCopyModal: (state) => {
      state.isOpenCopyModal = true
    },
    closeCopyModal: (state) => {
      state.isOpenCopyModal = false
    },
    openClearTodoConfirmModal: (state) => {
      state.isOpenClearTodoConfirmModal = true
    },
    closeClearTodoConfirmModal: (state) => {
      state.isOpenClearTodoConfirmModal = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.todos = action.payload
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload)
        state.isOpenTodoModal = false
      })
      .addCase(completeTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            todo.isCompleted = !todo.isCompleted
          }
          return todo
        })
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t._id !== action.payload._id)
      })
      .addCase(getTodoByIdAsync.fulfilled, (state, action) => {
        state.todo = action.payload
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const { _id, time, description } = action.payload
        const updatedTodos = state.todos.map((todo) => {
          if (todo._id === _id) {
            todo.time = time
            todo.description = description
          }
          return todo
        })
        state.todos = updatedTodos
        state.isOpenTodoModal = false
      })
      .addCase(copyTodoAsync.fulfilled, (state, action) => {
        state.isOpenCopyModal = false
      })
      .addCase(clearTodosAsync.fulfilled, (state, action) => {
        state.todos = []
        state.isOpenClearTodoConfirmModal = false
      })
  }
})

export const {
  openTodoModal,
  closeTodoModal,
  openCopyModal,
  closeCopyModal,
  openClearTodoConfirmModal,
  closeClearTodoConfirmModal
} = projectSlice.actions
export default projectSlice.reducer
