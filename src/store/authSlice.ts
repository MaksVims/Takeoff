import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UserService } from './../api/UserService';
import { LoginForm } from './../types/login';

interface AuthSliceState {
  authenticated: boolean,
  loading: boolean,
  error: string | null
}

const initialState: AuthSliceState = {
  authenticated: false,
  loading: false,
  error: null,
}

export const signIn = createAsyncThunk('auth/signIn', async (loginData: LoginForm, { rejectWithValue }) => {
  try {
    const { email, password } = loginData
    const users = await UserService.getAll()
    if (users.find(user => user.email === email || user.password === password)) {
      return true
    }
    throw new Error('User not found')
  } catch (e) {
    return rejectWithValue((e as Error).message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.authenticated = false
    },
  },
  extraReducers: (build) => {
    build
      .addCase(signIn.pending, (state) => {
        state.error = null;
        state.loading = true
      })
      .addCase(signIn.fulfilled, (state) => {
        state.loading = false
        state.authenticated = true
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions