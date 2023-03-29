import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import users from '../../../public/users.json'

export interface AuthState {
  username: string | null
  isAuthenticated: boolean
  error: string | null
  type: string | null
  id: string | null
  borrowedBooks: string[] | null
}
export interface AllUsersState {
  users: AuthState[]
}
const initialState: AuthState = {
  username: null,
  isAuthenticated: false,
  error: null,
  type: null,
  id: null,
  borrowedBooks: null
}
export const fetchusers = async (): Promise<{ users: AuthState[] }> => {
  const userResponse = await fetch('/users.json')
  const users = await userResponse.json()
  return { users: users }
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const { username, password } = action.payload
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      )
      if (foundUser) {
        state.error = null
        state.username = username
        state.isAuthenticated = true
        state.type = foundUser.type
        state.id = foundUser.id
        state.borrowedBooks = foundUser.borrowedBooks
        localStorage.setItem('user', JSON.stringify(action.payload.username))
        localStorage.setItem('userid', JSON.stringify(foundUser.id))
        localStorage.setItem('userBorrowedBooks', JSON.stringify(foundUser.borrowedBooks))
        localStorage.setItem('isAuthenticated', 'true')
      } else {
        state.error = 'Invalid username or password. Try again!'
        state.username = null
        state.isAuthenticated = false
      }
    },
    logout: (state) => {
      state.error = null
      state.username = null
      state.isAuthenticated = false
      state.id = null
      state.borrowedBooks = []
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userid')
      localStorage.removeItem('userBorrowedBooks')
    }
  }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
