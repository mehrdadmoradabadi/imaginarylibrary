import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Book } from '../types'

export interface BooksState {
  books: Book[]
  error: null | string
}

const initialState: BooksState = {
  books: [],
  error: null
}

export const fetchBooksThunk = createAsyncThunk('books/fetch', async () => {
  const response = await fetch(`./books.json`)
  const data = await response.json()
  localStorage.setItem('books', JSON.stringify(data))
  return {
    books: data,
    total: data.length,
    error: null
  }
})
export const addBookThunk = createAsyncThunk('books/add', async (newBook: Book) => {
  // const response = await fetch(`./books.json`)
  // const data = await response.json()
  // localStorage.setItem('books', JSON.stringify(data))
  return {
    newBook,
    error: null
  }
})
export const filterBookThunk = createAsyncThunk('books/filter', async (searchQuery: string) => {
  const books: Book[] = JSON.parse(localStorage.getItem('books') || '[]')
  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(searchQuery.toLowerCase())
    const descriptionMatch = book.description.toLowerCase().includes(searchQuery.toLowerCase())

    return titleMatch || descriptionMatch
  })
  return {
    filteredBooks,
    error: null
  }
})
export const delBookThunk = createAsyncThunk('books/del', async (isbn: string) => {
  // const response = await fetch(`./books.json`)
  // const data = await response.json()
  return {
    isbn,
    error: null
  }
})

export const updateBooksThunk = createAsyncThunk('books/update', async (updatedBook: Book) => {
  // const response = await fetch(`./books.json`)
  // const data = await response.json()
  return {
    books: updatedBook,
    error: null
  }
})

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooksThunk.fulfilled, (state, action) => {
      state.books = action.payload.books
    })
    builder.addCase(fetchBooksThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })

    builder.addCase(addBookThunk.fulfilled, (state, action) => {
      state.books = [action.payload.newBook, ...state.books]
    })
    builder.addCase(addBookThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })

    builder.addCase(updateBooksThunk.fulfilled, (state, action) => {
      const updatedBooks = state.books.map((book) => {
        if (book.isbn === action.payload.books.isbn) {
          return action.payload.books
        }
        return book
      })
      state.books = updatedBooks
    })
    builder.addCase(updateBooksThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })

    builder.addCase(delBookThunk.fulfilled, (state, action) => {
      state.books = state.books.filter((book) => book.isbn !== action.payload.isbn)
    })
    builder.addCase(delBookThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })

    builder.addCase(filterBookThunk.fulfilled, (state, action) => {
      state.books = action.payload.filteredBooks
    })
    builder.addCase(filterBookThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
  }
})
export default booksSlice.reducer
