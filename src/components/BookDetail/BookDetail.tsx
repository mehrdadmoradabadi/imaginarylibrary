import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Book } from '../../features/types'
import { Typography, Paper, Grid, Button } from '@mui/material/'

import { useAppDispatch, RootState } from '../../store'
import { borrowBookThunk } from '../../features/books/bookSlice'

import './BookDetail.css'
import { useSelector } from 'react-redux'

export default function BookDetail() {
  const { id } = useParams<string>()
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.books)
  const userId = useSelector((state: RootState) => state.authentication.logedInUser?.user_id) || 0
  const [book, setBook] = useState<Book | undefined>()
  const books: Book[] = data.books
  const [isBorrowed, setIsBorrowed] = useState<boolean>()
  const filteredBook = books.find((book: Book) => book.isbn === id)
  useEffect(() => {
    setBook(filteredBook)
    setIsBorrowed(book?.status === 'unavailable')
  }, [id, isBorrowed, handleBorrow])
  if (!book) {
    return <div>Loading...</div>
  }
  function handleBorrow(bookISBN: number) {
    setIsBorrowed(true)
    if (book) {
      dispatch(borrowBookThunk({ userId: userId, bookId: bookISBN }))
    }
  }
  return (
    <>
      <Paper sx={{ margin: '0', height: '100%', overflow: 'hidden' }}>
        <Grid
          container
          className="grid"
          sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Grid
            item
            className="container"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <img className="cover" alt={`${book.title} cover`} src={book.imageUrl} />
            <div className="title">
              <Typography variant="h5" gutterBottom>
                {book.title}
              </Typography>
            </div>
          </Grid>
          <Grid
            className="detail-container"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginTop: '5%',
              marginLeft: '5%'
            }}>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Author: {'  '}
              {book.authors.map((author) => (
                <span key={author.id}>{author.name}</span>
              ))}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {book.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              PublishedDate: {book.publishedDate?.split('T')[0]}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Genre: {book.genre}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Isbn: {book.isbn}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Availability: {book.status}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disabled={isBorrowed}
              onClick={() => handleBorrow(Number(book.isbn))}>
              Borrow
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
