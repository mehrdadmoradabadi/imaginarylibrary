import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Title'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchBooksThunk } from '../../features/books/bookSlice'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export default function Books() {
  const [sortedBy, setSortedBy] = React.useState('lastBorrowerId')
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBooksThunk())
  }, [])
  const { books } = useSelector((state: RootState) => state.books)
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

  return (
    <React.Fragment>
      <Title>All Books</Title>
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
            <TableCell onClick={() => setSortedBy('lastBorrowerId')} sx={{ cursor: 'pointer' }}>
              Last Borrower ID
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBooks.map((book) => (
            <TableRow key={book.isbn}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.authors}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.borrowerId}</TableCell>
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
