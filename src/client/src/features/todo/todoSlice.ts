import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getTodos,
  addTodo,
  deleteTodo,
  completeTodo,
  getTodoById,
  updateTodo
} from './todoApi'
export interface TodoState {
  isOpenTodoModal: boolean
  todos: Array<TodoProps>
  todo: TodoProps | null
}
export interface TodoProps {
  _id?: string
  date: string
  time: string
  description: string
  isCompleted?: boolean
}

const initialState: TodoState = {
  isOpenTodoModal: false,
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
  async (date: string) => {
    const response = await getTodos(date)
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
  }
})

export const { openTodoModal, closeTodoModal } = projectSlice.actions
export default projectSlice.reducer
