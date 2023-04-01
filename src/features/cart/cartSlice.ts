import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Book, Status } from '../types'
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
export const fetchCartItemsThunk = createAsyncThunk('cart/fetch', async () => {
  const cartISBNs: string[] = JSON.parse(localStorage.borrowedBooks) || []
  return {
    isbn: cartISBNs,
    error: null
  }
})
export const addToCartThunk = createAsyncThunk('cart/add', async (isbn: string) => {
  return {
    isbn: isbn,
    error: null
  }
})
export const removeFromCartThunk = createAsyncThunk('cart/remove', async (isbn: string) => {
  return {
    isbn: isbn,
    error: null
  }
})
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      const date = new Date()
      const formattedDate = date.toISOString().slice(0, 10)
      const userId = localStorage.getItem('id')
      let parsedUserId: number
      if (userId) {
        parsedUserId = JSON.parse(userId)
      }
      if (!localStorage.borrowedBooks.includes(action.payload.isbn)) {
        const updatedBooks = JSON.parse(localStorage.books).map((b: Book) => {
          if (b.isbn === action.payload.isbn) {
            b.status = Status.UNAVAILABLE
            b.borrowerId = parsedUserId.toString()
            b.borrowDate = formattedDate
          }
          return b
        })
        localStorage.setItem('books', JSON.stringify(updatedBooks))
      }
      state.isbn.push({ isbn: action.payload.isbn })
      const userBorrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks') || '') || []
      userBorrowedBooks.push(action.payload.isbn)
      localStorage.setItem('borrowedBooks', JSON.stringify(userBorrowedBooks))
    })
    builder.addCase(addToCartThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
    builder.addCase(removeFromCartThunk.fulfilled, (state, action) => {
      state.books = state.books.filter((book: Book) => book.isbn !== action.payload.isbn)
      const isbnStrings = state.isbn
        .filter((item) => item.isbn !== action.payload.isbn)
        .map((item: Cart) => item.isbn)
      console.log(isbnStrings)
      localStorage.setItem('borrowedBooks', JSON.stringify(isbnStrings))
      state.isbn = state.isbn.filter((item: Cart) => item.isbn !== action.payload.isbn)
    })
    builder.addCase(removeFromCartThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
    builder.addCase(fetchCartItemsThunk.fulfilled, (state, action) => {
      const data = localStorage.getItem('books') ?? ''
      const books: Book[] = JSON.parse(data)
      const items = books.filter((book: Book) => action.payload.isbn.includes(book.isbn))
      state.books = items
      state.error = action.payload.error
      state.isbn = action.payload.isbn.map((isbn) => ({ isbn }))
    })
    builder.addCase(fetchCartItemsThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
  }
})

export default cartSlice.reducer
