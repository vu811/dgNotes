import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

export interface LayoutState {
  isOpenSideBar: boolean
}

const initialState: LayoutState = {
  isOpenSideBar: false
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    updateSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSideBar = action.payload
    }
  }
})

export const selectIsOpenSideBar = (state: RootState) => state.layout.isOpenSideBar

export const { updateSidebar } = layoutSlice.actions

export default layoutSlice.reducer
