import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMe, login, logout, register } from './authApi'

export interface UserProps {
  _id: string
  name: string
  email: string
}

export interface CurrentUserProps {
  currentUser?: UserProps
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  name: string
}

export interface AuthState {
  currentUser: UserProps | null
  email: string | null
}

const initialState: AuthState = {
  currentUser: null,
  email: null
}

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload) => {
    const response = await register(payload)
    return response.data
  }
)

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload) => {
    const response = await login(payload)
    return response.data
  }
)

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  await logout()
})

export const getMeAsync = createAsyncThunk('auth/me', async () => {
  const response = await getMe()
  return response.data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.email = action.payload.email
    })
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(getMeAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(getMeAsync.rejected, (state, action) => {
      state.currentUser = null
    })
  }
})

export default authSlice.reducer