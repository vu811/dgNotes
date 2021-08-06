import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from '../layouts/layoutSlice'
import projectSlice from '../features/projectManagement/projectSlice'
import todoSlice from '../features/todoList/todoSlice'

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    project: projectSlice,
    todo: todoSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
