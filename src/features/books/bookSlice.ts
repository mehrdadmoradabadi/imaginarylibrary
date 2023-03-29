import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Book {
  isbn: string
  title: string
  description: string
  publisher: string
  authors: string[]
  status: string
  borrowerId: string | null
  publishedDate: string | null
  borrowDate: string | null
  returnDate: string | null
  url: string
  genre: string
}

export interface BooksState {
  books: Book[]
  total: number
}

const initialState: BooksState = {
  books: [],
  total: 0
}

export const fetchBooks = async (): Promise<{ books: Book[]; total: number }> => {
  const response = await fetch(`./books.json`)
  const data = await response.json()
  return {
    books: data,
    total: data.length
  }
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooks(state, action: PayloadAction<{ books: Book[]; total: number }>) {
      state.books = action.payload.books
      state.total = action.payload.total
    }
  }
})
export const { getBooks } = booksSlice.actions
export default booksSlice.reducer

export const fetchBooksThunk = () => async (dispatch: any) => {
  const { books, total } = await fetchBooks()
  localStorage.setItem('books', JSON.stringify(books))

  dispatch(getBooks({ books, total }))
}
