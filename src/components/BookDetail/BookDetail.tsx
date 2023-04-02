import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Book } from '../../features/types'
import { Typography, Paper, Grid, Button } from '@mui/material/'
import { addToCartThunk } from '../../features/cart/cartSlice'
import { useAppDispatch } from '../../store'

import Header from '../Home/Header'
import Footer from '../Home/Footer'
import './BookDetail.css'

export default function BookDetail() {
  const { id } = useParams<string>()
  const [isBorrowed, setisBorrowed] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const data = localStorage.getItem('books')
  const [book, setBook] = useState<Book | undefined>()
  const books: Book[] = data ? JSON.parse(data) : null
  const filteredBook = books.find((book: Book) => book.isbn === id)
  useEffect(() => {
    setBook(filteredBook)
  }, [id, isBorrowed])
  if (!book) {
    return <div>Loading...</div>
  }
  function handleBorrow(bookISBN: string) {
    setisBorrowed(true)
    dispatch(addToCartThunk(bookISBN))
  }
  return (
    <>
      <Header title="Imaginary Library" sections={[]} />
      <Paper sx={{ margin: '0', height: '100%', overflow: 'hidden' }}>
        <Grid
          container
          className="grid"
          sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Grid
            item
            className="container"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <img className="cover" alt={`${book.title} cover`} src="/book.jpg" />
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
              Author: {book.authors}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {book.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              PublishedDate: {book.publishedDate}
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
              onClick={() => handleBorrow(book.isbn)}>
              Borrow
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Footer
        title="Thank you"
        description="Thank you for visiting the Imaginary Library! We hope you found what you were looking for and enjoyed your experience with us. Remember, the library is always here for you, whether you're looking for a good book to read, a virtual event to attend, or a friendly face to talk to. Keep exploring, keep learning, and keep reading!"
      />
    </>
  )
}
