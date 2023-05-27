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

export const uploadBookCoverThunk = createAsyncThunk(
  'books/cover',
  async ({ bookIsbn, bookImage }: { bookIsbn: number; bookImage: File }) => {
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('cover', bookImage)
    const response = await fetch(
      `https://imaginarylibrary.onrender.com/api/v1/admin/book/img/${bookIsbn}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    )
    const data = await response.json()
    console.log('datais :', data)
  }
)

export const fetchBooksThunk = createAsyncThunk('books/fetch', async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(`https://imaginarylibrary.onrender.com/api/v1/books`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  localStorage.setItem('books', JSON.stringify(data))
  return {
    books: data,
    total: data.length,
    error: null
  }
})

export const fetchBooksByIdThunk = createAsyncThunk('books/fetchById', async (id: string) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`https://imaginarylibrary.onrender.com/api/v1/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  localStorage.setItem('books', JSON.stringify(data))
  return {
    books: data,
    error: null
  }
})

export const addBookThunk = createAsyncThunk('books/add', async (newBook: Book) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`https://imaginarylibrary.onrender.com/api/v1/admin/book`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newBook)
  })
  const data = await response.json()
  // localStorage.setItem('books', JSON.stringify(data))
  return {
    data,
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
export const categoryBookThunk = createAsyncThunk('books/category', async (searchQuery: string) => {
  const books: Book[] = JSON.parse(localStorage.getItem('books') || '[]')
  const filteredBooks = books.filter((book) => {
    const category = book.genre.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    return category
  })
  return {
    filteredBooks,
    error: null
  }
})

export const borrowBookThunk = createAsyncThunk(
  'books/borrow',
  async ({ userId, bookId }: { userId: number; bookId: number }) => {
    const token = localStorage.getItem('token')
    const response = await fetch(
      `https://imaginarylibrary.onrender.com/api/v1/books/borrow/${bookId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId: userId })
      }
    )
    const data = await response.json()
    return {
      data,
      error: null
    }
  }
)

export const delBookThunk = createAsyncThunk('books/del', async (isbn: string) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`https://imaginarylibrary.onrender.com/api/v1/admin/book/${isbn}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  })
  response
  return {
    isbn,
    error: null
  }
})

export const updateBooksThunk = createAsyncThunk('books/update', async (updatedBook: Book) => {
  const token = localStorage.getItem('token')
  console.log(updatedBook)
  const response = await fetch(
    `https://imaginarylibrary.onrender.com/api/v1/admin/book/${updatedBook.isbn}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(updatedBook)
    }
  )
  const data = await response.json()
  return {
    book: data,
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
      state.books = [action.payload.data, ...state.books]
    })
    builder.addCase(addBookThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })

    builder.addCase(updateBooksThunk.fulfilled, (state, action) => {
      const updatedBooks = state.books.map((book) => {
        if (book.isbn === action.payload.book.isbn) {
          return action.payload.book
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
    builder.addCase(categoryBookThunk.fulfilled, (state, action) => {
      state.books = action.payload.filteredBooks
    })
    builder.addCase(categoryBookThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
    builder.addCase(fetchBooksByIdThunk.fulfilled, (state, action) => {
      state.books = action.payload.books
    })
    builder.addCase(borrowBookThunk.fulfilled, (state, action) => {
      const updatedBooks = state.books.map((book) => {
        if (book.isbn === action.payload.data.isbn) {
          return action.payload.data
        }
        return book
      })
      state.books = updatedBooks
    })
  }
})
export default booksSlice.reducer
