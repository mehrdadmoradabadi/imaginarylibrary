import { configureStore } from '@reduxjs/toolkit'
import signInReducer from './features/authentication/authSlice'
import { useDispatch } from 'react-redux'
import bookReducer from './features/books/bookSlice'
import cartReducer from './features/cart/cartSlice'
import usersReducer from './features/users/usersSlice'
import authrerReducer from './features/authors/authorsSlice'
export const store = configureStore({
  reducer: {
    authentication: signInReducer,
    books: bookReducer,
    cart: cartReducer,
    authors: authrerReducer,
    users: usersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
