import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { UserService } from './../api/UserService';
import { LoginForm } from './../types/login';
import { User } from './../types/user';

import { RootState } from '.';

interface AuthSliceState {
  user: User | null,
  loading: boolean,
  error: string | null
}

const initialState: AuthSliceState = {
  user: null,
  loading: false,
  error: null,
}

export const fetchUser = createAsyncThunk('auth/fetchUser', async (loginData: LoginForm, { rejectWithValue }) => {
  try {
    const { email, password } = loginData
    const user = await UserService.getByEmailAndPassword(email, password)

    if (user) {
      return user
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
      state.user = null
    },
    signIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    resetError:(state) => {
      state.error = null
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
        state.loading = true
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
export const selectUser = (state:RootState) => state.auth.user