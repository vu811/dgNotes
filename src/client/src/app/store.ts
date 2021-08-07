import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from '../layouts/layoutSlice'
import projectReducer from '../features/projectManagement/projectSlice'
import todoReducer from '../features/todoList/todoSlice'
import appReducer from './appSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    layout: layoutReducer,
    project: projectReducer,
    todo: todoReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
