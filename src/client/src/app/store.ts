import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from '../layouts/layoutSlice'

export const store = configureStore({
  reducer: {
    layout: layoutReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
