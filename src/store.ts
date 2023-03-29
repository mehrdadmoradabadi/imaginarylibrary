import { configureStore } from '@reduxjs/toolkit'
import signInReducer from './features/authentication/authSlice'
import { useDispatch } from 'react-redux'
import bookReducer from './features/books/bookSlice'
import cartReducer from './features/cart/cartSlice'
export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    books: bookReducer,
    cart: cartReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
