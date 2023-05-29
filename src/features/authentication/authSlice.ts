import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthUser, DecodedUser, User } from '../types'
import jwt_Decode from 'jwt-decode'
import { getDecodedTokenFromStorage } from '../../utils/token'

export interface AllUsersState {
  logedInUser: DecodedUser | null
  error: string | null
}
const initialState: AllUsersState = {
  logedInUser: null,
  error: null
}

export const logoutUserThunk = createAsyncThunk('user/logout', async () => {
  return {}
})
export const loginUsersThunk = createAsyncThunk('users/login', async (propUser: AuthUser) => {
  const response = await fetch(`https://imaginarylibrary.onrender.com/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: propUser.username, password: propUser.password })
  })
  const token = await response.text()
  if (token == '') {
    return {
      isAuthenticated: false,
      error: 'Wrong Username or Password!',
      token: null
    }
  }
  return {
    isAuthenticated: true,
    token: token,
    error: null
  }
})
export const signUpUsersThunk = createAsyncThunk('users/signup', async (propUser: User) => {
  console.log('new USer: ', propUser)
  const response = await fetch(`https://imaginarylibrary.onrender.com/api/v1/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: propUser.username,
      password: propUser.password,
      firstName: propUser.firstName,
      lastName: propUser.lastName,
      role: propUser.role,
      borrowedBooks: []
    })
  })
  const newUser = await response.text()
  return {
    newUser,
    error: null
  }
})

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUsersFromStorage: (state) => {
      const user = getDecodedTokenFromStorage()
      if (user) {
        state.logedInUser = user
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUsersThunk.fulfilled, (state, action) => {
      const token = action.payload.token
      if (token) {
        localStorage.setItem('token', token)
        const decodeduser: DecodedUser = jwt_Decode(token)
        state.logedInUser = decodeduser
      }
      state.error = action.payload.error
    })
    builder.addCase(loginUsersThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.error = null
      state.logedInUser = null
      localStorage.removeItem('token')
    })
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
    builder.addCase(signUpUsersThunk.fulfilled, (state, action) => {
      console.log(action.payload.newUser)
    })
  }
})
export const { loadUsersFromStorage } = authSlice.actions

export default authSlice.reducer
