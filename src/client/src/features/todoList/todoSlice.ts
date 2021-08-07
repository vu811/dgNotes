import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTodos, addTodo, deleteTodo } from './todoApi'

export interface TodoState {
  isOpenTodoModal: boolean
  todos: Array<TodoResponse>
}

export interface TodoProps {
  date: string
  time: string
  description: string
}

export interface TodoResponse extends TodoProps {
  _id: string
}

const initialState: TodoState = {
  isOpenTodoModal: false,
  todos: []
}

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

export const deleteTodoAsync = createAsyncThunk(
  'todo/delete',
  async (id: string) => {
    const response = await deleteTodo(id)
    return response.data
  }
)

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    openTodoModal: (state) => {
      state.isOpenTodoModal = true
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
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((t) => t._id !== action.payload._id)
      })
  }
})

export const { openTodoModal, closeTodoModal } = projectSlice.actions
export default projectSlice.reducer
