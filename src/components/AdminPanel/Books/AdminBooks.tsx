import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import UpdateIcon from '@mui/icons-material/Update'
import DeleteIcon from '@mui/icons-material/Delete'

import { useEffect, useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../store'
import { fetchBooksThunk, delBookThunk } from '../../../features/books/bookSlice'
import { UpdateBookForm } from '../Forms/UpdateBookForm'
import Title from '../Title/Title'
import NewBookForm from '../Forms/NewBookForm'

import './AdminBooks.css'

export default function Books() {
  const [sortedBy, setSortedBy] = useState('title')
  const { books } = useSelector((state: RootState) => state.books)
  const [updatedBookIsbn, setUpdatedBookIsbn] = useState<string | null>(null)
  const bookToBeUpdated = books.find((book) => book.isbn === updatedBookIsbn)
  const [addNewBook, setAddNewBook] = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBooksThunk())
  }, [])

  let sortedBooks = books
  if (sortedBy === 'title') {
    sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortedBy === 'author') {
    sortedBooks = [...books].sort((a, b) => {
      const authorA = a.authors.join(', ')
      const authorB = b.authors.join(', ')
      return authorA.localeCompare(authorB)
    })
  } else if (sortedBy === 'isbn') {
    sortedBooks = [...books].sort((a, b) => a.isbn.localeCompare(b.isbn))
  }
  const handleUpdateBook = (isbn: string) => {
    setUpdatedBookIsbn(isbn)
  }
  const handleAddNewBook = () => {
    setAddNewBook((prev) => !prev)
  }
  return (
    <Fragment>
      <div className="admintitle">
        <IconButton sx={{ color: 'green' }} onClick={() => handleAddNewBook()}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
        <Title>All Books</Title>
      </div>
      {addNewBook ? <NewBookForm /> : null}
      {bookToBeUpdated ? <UpdateBookForm book={bookToBeUpdated} /> : null}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => setSortedBy('title')} sx={{ cursor: 'pointer' }}>
              Title
            </TableCell>
            <TableCell onClick={() => setSortedBy('author')} sx={{ cursor: 'pointer' }}>
              Author
            </TableCell>
            <TableCell onClick={() => setSortedBy('isbn')} sx={{ cursor: 'pointer' }}>
              ISBN
            </TableCell>
            <TableCell>Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBooks.map((book) => (
            <TableRow key={book.isbn}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.authors.map((author) => author['name'])}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell sx={{ display: 'flex' }}>
                <IconButton sx={{ color: 'goldenrod' }} onClick={() => handleUpdateBook(book.isbn)}>
                  <UpdateIcon />
                </IconButton>
                <IconButton sx={{ color: 'red' }} onClick={() => dispatch(delBookThunk(book.isbn))}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  )
}
