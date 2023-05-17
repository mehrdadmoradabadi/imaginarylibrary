import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Book } from '../types'
interface Cart {
  isbn: string
}

interface CartState {
  isbn: Cart[]
  error: string | null
  books: Book[]
}

const initialState: CartState = {
  isbn: [],
  error: null,
  books: []
}
export const fetchCartItemsThunk = createAsyncThunk('cart/fetch', async (userId: number) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`http://localhost:8080/api/v1/books/borrow/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  return {
    data,
    error: null
  }
})

export const removeFromCartThunk = createAsyncThunk(
  'cart/remove',
  async ({ userId, bookId }: { userId: number; bookId: number }) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:8080/api/v1/books/borrow/${bookId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId: userId })
    })
    const data = await response.json()
    return {
      data,
      error: null
    }
  }
)
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(removeFromCartThunk.fulfilled, (state, action) => {
      state.books = state.books.filter((book: Book) => book.isbn !== action.payload.data.isbn)
      // const isbnStrings = state.isbn
      //   .filter((item) => item.isbn !== action.payload.data.isbn)
      //   .map((item: Cart) => item.isbn)
    })
    builder.addCase(removeFromCartThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
    builder.addCase(fetchCartItemsThunk.fulfilled, (state, action) => {
      state.books = action.payload.data
      state.error = action.payload.error
    })
    builder.addCase(fetchCartItemsThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
  }
})

export default cartSlice.reducer
