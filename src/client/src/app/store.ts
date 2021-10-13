import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from '../layouts/layoutSlice'
import projectReducer from '../features/project/projectSlice'
import todoReducer from '../features/todo/todoSlice'
import appReducer from './appSlice'
import goalReducer from '../features/goal/goalSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    layout: layoutReducer,
    project: projectReducer,
    todo: todoReducer,
    goal: goalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
