import { Fragment } from 'react'

import { Book } from '../../../features/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import Title from '../Title/Title'

export default function BorrowedBooks() {
  const books: Book[] = useSelector((state: RootState) => state.books.books)
  const allBorrowedBooks = books.filter((book) => {
    if (book.borrowerId !== null) return book
  })
  return (
    <>
      <Fragment>
        <div className="admintitle">
          <Title>All Borrowed Books</Title>
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ cursor: 'pointer' }}>Title</TableCell>
              <TableCell sx={{ cursor: 'pointer' }}>ISBN</TableCell>
              <TableCell sx={{ cursor: 'pointer' }}>BorrowDate</TableCell>
              <TableCell sx={{ cursor: 'pointer' }}>Borrower</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBorrowedBooks.map((book) => (
              <TableRow key={book.isbn}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.borrowDate}</TableCell>
                <TableCell>{book.borrowerId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Fragment>
    </>
  )
}
