import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Author } from '../types'

export interface AuthorState {
  authors: Author[]
  error: null | string
}

const initialState: AuthorState = {
  authors: [],
  error: null
}

export const fetchAllAuthorsThunk = createAsyncThunk('authors/fetch', async () => {
  const token = localStorage.getItem('token')
  const response = await fetch(`https://imaginarylibrary.onrender.com/api/v1/admin/authors`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await response.json()
  console.log(data)
  return {
    data,
    error: null
  }
})
export const deleteAuthorsThunk = createAsyncThunk('authors/delete', async (id: number) => {
  const token = localStorage.getItem('token')
  await fetch(`https://imaginarylibrary.onrender.com/api/v1/admin/authors/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  return {
    id,
    error: null
  }
})
export const addAuthorsThunk = createAsyncThunk('authors/add', async (newAuthor: Author) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`https://imaginarylibrary.onrender.com/api/v1/admin/authors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(newAuthor)
  })
  const data = await response.json()
  return {
    data,
    error: null
  }
})
export const updateAuthorsThunk = createAsyncThunk(
  'authors/update',
  async (updatedAuthor: Author) => {
    const token = localStorage.getItem('token')
    const response = await fetch(
      `https://imaginarylibrary.onrender.com/api/v1/admin/authors/${updatedAuthor.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedAuthor)
      }
    )
    const data = await response.json()
    return {
      data,
      error: null
    }
  }
)

export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllAuthorsThunk.fulfilled, (state, action) => {
      state.authors = action.payload.data
      state.error = action.payload.error
    })
    builder.addCase(fetchAllAuthorsThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })

    builder.addCase(deleteAuthorsThunk.fulfilled, (state, action) => {
      state.authors = state.authors.filter((author) => author.id !== action.payload.id)
      state.error = action.payload.error
    })
    builder.addCase(deleteAuthorsThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
    builder.addCase(updateAuthorsThunk.fulfilled, (state, action) => {
      const updatedAuthor = state.authors.map((author) => {
        if (author.id === action.payload.data.id) {
          return action.payload.data
        }
        return author
      })
      state.authors = updatedAuthor
    })
    builder.addCase(updateAuthorsThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
    builder.addCase(addAuthorsThunk.fulfilled, (state, action) => {
      state.authors = [action.payload.data, ...state.authors]
    })
    builder.addCase(addAuthorsThunk.rejected, (state) => {
      state.error = 'something went wrong'
    })
  }
})
export default authorsSlice.reducer
