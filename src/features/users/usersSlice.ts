import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '../types'

interface UserState {
  users: User[]
  error: string | null
}
const initialState: UserState = {
  users: [],
  error: null
}

export const fetchAllUsersThunk = createAsyncThunk('users/fetch', async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(`https://imaginarylibrary.onrender.com/api/v1/admin/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  return {
    users: data,
    error: null
  }
})
export const updateUserThunk = createAsyncThunk('users/update', async (updatedUser: User) => {
  const token = localStorage.getItem('token')
  const response = await fetch(
    `https://imaginarylibrary.onrender.com/api/v1/admin/user/${updatedUser.userId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedUser)
    }
  )
  const data = await response.json()
  return {
    user: data,
    error: null
  }
})
export const deleteUserThunk = createAsyncThunk('users/delete', async (deletedUser: User) => {
  const token = localStorage.getItem('token')
  await fetch(`https://imaginarylibrary.onrender.com/api/v1/admin/user/${deletedUser.userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  return {
    user: deletedUser,
    error: null
  }
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersThunk.fulfilled, (state, action) => {
      state.users = action.payload.users
      state.error = action.payload.error
    })
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      const updatedUser = state.users.map((user) => {
        if (user.userId === action.payload.user.id) {
          return action.payload.user
        }
        return user
      })
      state.users = updatedUser
      state.error = action.payload.error
    })
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.userId !== action.payload.user.userId)
      state.error = action.payload.error
    })
  }
})
export default usersSlice.reducer
