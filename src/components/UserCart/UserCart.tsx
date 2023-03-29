import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Paper
} from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { Book } from '../../features/books/bookSlice'
import './UserCart.css'

const UserCart = () => {
  const [cartItems, setCartItems] = useState<Book[]>([])
  const cartISBNs = JSON.parse(localStorage.userBorrowedBooks) || []
  useEffect(() => {
    const data = localStorage.getItem('books')
    if (data) {
      const books: Book[] = JSON.parse(data)
      const items = books.filter((book: Book) => cartISBNs.includes(book.isbn))
      setCartItems(items)
    }
  }, [])

  const handleDelete = (id: string) => {
    const updatedCartIBNs = cartISBNs.filter((isbnItem: string) => isbnItem !== id)
    localStorage.setItem('userBorrowedBooks', JSON.stringify(updatedCartIBNs))
    if (updatedCartIBNs.length === 0) {
      localStorage.setItem('userBorrowedBooks', '[]')
    }
    const updatedCartItems = cartItems.filter((item) => item.isbn !== id)
    setCartItems(updatedCartItems)
    const data = localStorage.getItem('books')
    if (data) {
      const date = new Date()
      const formattedDate = date.toISOString().slice(0, 10)

      const books: Book[] = JSON.parse(data)
      const bookToUpdate = books.find((book) => book.isbn === id)
      if (bookToUpdate) {
        bookToUpdate.status = 'available'
        bookToUpdate.borrowerId = null
        bookToUpdate.returnDate = formattedDate
        localStorage.setItem('books', JSON.stringify(books))
      }
    }
  }
  console.log(cartItems)
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">Library Cart</Typography>
      {cartISBNs.length !== 0 ? (
        <>
          <List className="container">
            {cartItems.map((item) => (
              <Paper key={item.isbn} className="paper">
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <img
                      src="/book.jpg"
                      alt={item.title}
                      className="item-cover"
                      style={{ borderRadius: 8, width: '200px', marginRight: '50px' }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="subtitle1">{item.title}</Typography>}
                    secondary={
                      <>
                        <Typography variant="subtitle2" color="text.secondary">
                          Borrowed at:
                        </Typography>
                        <Typography variant="subtitle2">{item.borrowDate}</Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(item.isbn)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            ))}
          </List>
          <Button href={'/dashboard'} variant="outlined" size="small">
            Back to dashboard
          </Button>
        </>
      ) : (
        <>
          <Alert severity="info" className="alert-info">
            Your cart is EMPTY!
          </Alert>
          <Button href={'/dashboard'} variant="outlined" size="small" sx={{ marginTop: '5%' }}>
            Back to dashboard
          </Button>
        </>
      )}
    </Box>
  )
}

export default UserCart
