import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Book } from '../../features/books/bookSlice'
import { Typography, Paper, Grid, Button } from '@material-ui/core'
import Header from '../Home/Header'
import Footer from '../Home/Footer'
import './BookDetail.css'
import { addToCart } from '../../features/cart/cartSlice'
import { useAppDispatch } from '../../store'

export default function BookDetail() {
  const { id } = useParams<string>()
  const [isBorrowed, setisBorrowed] = useState<boolean>(false)
  const [book, setBooks] = useState<Book | null>(null)
  const userId = localStorage.getItem('userid')
  const dispatch = useAppDispatch()
  let parsedUserId: number
  if (userId) {
    parsedUserId = JSON.parse(userId)
  }
  useEffect(() => {
    const data = localStorage.getItem('books')
    if (data) {
      const books: Book[] = JSON.parse(data)
      const filteredBooks = books.filter((book: Book) => book.isbn === id)
      if (filteredBooks.length === 1) {
        const book = filteredBooks[0]
        if (book.status !== 'available' || localStorage.userBorrowedBooks.includes(book.title)) {
          setisBorrowed(true)
        }
        setBooks(book)
      }
    }
  }, [id, isBorrowed])

  if (!book) {
    return <div>Loading...</div>
  }

  function handleBorrow(bookISBN: string) {
    const date = new Date()
    const formattedDate = date.toISOString().slice(0, 10)

    if (!localStorage.userBorrowedBooks.includes(bookISBN)) {
      const updatedBooks = JSON.parse(localStorage.books).map((b: Book) => {
        if (b.isbn === bookISBN) {
          b.status = 'Borrowed'
          b.borrowerId = parsedUserId.toString()
          b.borrowDate = formattedDate
        }
        return b
      })
      setisBorrowed(true)
      localStorage.setItem('books', JSON.stringify(updatedBooks))
      if (book) {
        dispatch(addToCart({ bookISBN }))
      }
    }
  }

  return (
    <>
      <Header title="Imaginary Library" sections={[]} />
      <Paper className="paper">
        <Grid container className="grid">
          <Grid item className="container">
            <img className="cover" alt={`${book.title} cover`} src="/book.jpg" />
            <div className="title">
              <Typography variant="h5" gutterBottom>
                {book.title}
              </Typography>
            </div>
          </Grid>
          <Grid className="detail-container">
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
