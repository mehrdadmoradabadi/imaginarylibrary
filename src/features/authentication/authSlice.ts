import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User, Role } from '../types'

export interface AllUsersState {
  users: User[]
  error: null | string
  username: string | null
  isAuthenticated: boolean
  role: Role | null
  borrowedBook: string[] | null
  id: string | null
}
const initialState: AllUsersState = {
  users: [],
  error: null,
  username: '',
  isAuthenticated: false,
  role: Role.USER,
  borrowedBook: [],
  id: null
}

export const logoutUserThunk = createAsyncThunk('user/logout', async () => {
  return {}
})
export const loginUsersThunk = createAsyncThunk('users/fetch', async (propUser: User) => {
  const userResponse = await fetch('/users.json')
  const users = await userResponse.json()
  const foundUser = users.find(
    (user: User) => user.username === propUser.username && user.password === propUser.password
  )
  if (foundUser) {
    return {
      username: foundUser.username,
      role: foundUser.type,
      borrowedBooks: foundUser.borrowedBook,
      error: null,
      isAuthenticated: true,
      id: foundUser.id
    }
  }
  return {
    username: null,
    error: 'Wrong Username or Password!',
    isAuthenticated: false
  }
})

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUsersThunk.fulfilled, (state, action) => {
      state.error = action.payload.error
      state.username = action.payload.username
      state.isAuthenticated = action.payload.isAuthenticated
      state.role = action.payload.role
      state.id = action.payload.id
      localStorage.setItem('isAuthenticated', action.payload.isAuthenticated ? 'true' : 'false')
      localStorage.setItem('role', action.payload.role)
      localStorage.setItem(
        'borrowedBooks',
        action.payload.borrowedBooks === null || action.payload.borrowedBooks === undefined
          ? '[]'
          : JSON.stringify(action.payload.borrowedBooks)
      )
      localStorage.setItem('id', action.payload.id)
    })
    builder.addCase(loginUsersThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.error = null
      state.username = null
      state.isAuthenticated = false
      state.role = null
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('role')
      localStorage.removeItem('borrowedBooks')
      localStorage.removeItem('id')
    })
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
  }
})

export default authSlice.reducer
