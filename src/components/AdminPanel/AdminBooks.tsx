import * as React from 'react'
import { Link, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material'
import Title from './Title'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBooksThunk, delBookThunk } from '../../features/books/bookSlice'
import { UpdateBookForm } from './Forms/UpdateBookForm'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import UpdateIcon from '@mui/icons-material/Update'
import DeleteIcon from '@mui/icons-material/Delete'
import NewBookForm from './Forms/NewBookForm'

import './AdminBooks.css'
function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export default function Books() {
  const [sortedBy, setSortedBy] = React.useState('lastBorrowerId')
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
  } else if (sortedBy === 'lastBorrowerId') {
    sortedBooks = [...books].sort((a, b) => {
      return a.borrowerId && b.borrowerId ? a.borrowerId.localeCompare(b.borrowerId) : 0
    })
  }

  const handleUpdateBook = (isbn: string) => {
    setUpdatedBookIsbn(isbn)
  }
  const handleAddNewBook = () => {
    setAddNewBook((prev) => !prev)
  }
  return (
    <React.Fragment>
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
              <TableCell>{book.authors}</TableCell>
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
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more Books
      </Link>
    </React.Fragment>
  )
}
