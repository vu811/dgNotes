import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from '../layouts/layoutSlice'
import projectSlice from '../features/projectManagement/projectSlice'

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    project: projectSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
