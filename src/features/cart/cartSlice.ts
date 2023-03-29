import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Cart {
  isbn: string
}

interface CartState {
  isbn: Cart[]
}

const initialState: CartState = {
  isbn: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ bookISBN: string }>) => {
      const { bookISBN } = action.payload
      state.isbn.push({ isbn: bookISBN })
      const userBorrowedBooks = JSON.parse(localStorage.userBorrowedBooks) || []
      userBorrowedBooks.push(bookISBN)
      localStorage.setItem('userBorrowedBooks', JSON.stringify(userBorrowedBooks))
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.isbn = state.isbn.filter((item) => item.isbn !== action.payload)
    }
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
