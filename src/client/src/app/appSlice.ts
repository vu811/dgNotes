import { createSlice } from '@reduxjs/toolkit'
import { FlashType } from '../enums'

export interface AppState {
  flashAlert: FlashAlertType
}

interface FlashAlertType {
  isOpenFlashAlert: boolean
  message: string
  type: FlashType
}

const initialState: AppState = {
  flashAlert: {
    isOpenFlashAlert: false,
    message: '',
    type: FlashType.Info
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    flashAlert: (state, action) => {
      state.flashAlert = {
        isOpenFlashAlert: true,
        message: action.payload.message,
        type: action.payload.type
      }
    },
    closeFlashAlert: (state) => {
      state.flashAlert = {
        ...state.flashAlert,
        isOpenFlashAlert: false
      }
    }
  },
  extraReducers: (builder) => {}
})

export const { flashAlert, closeFlashAlert } = appSlice.actions
export default appSlice.reducer
