import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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

import './UserCart.css'
import { fetchCartItemsThunk, removeFromCartThunk } from '../../features/cart/cartSlice'
import { RootState, useAppDispatch } from '../../store'

const UserCart = () => {
  const { books, error } = useSelector((state: RootState) => state.cart)
  const userId = useSelector((state: RootState) => state.authentication.logedInUser?.user_id) || 0
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCartItemsThunk(userId))
  }, [])

  const handleDelete = (bookISBN: number) => {
    dispatch(removeFromCartThunk({ userId: userId, bookId: bookISBN }))
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">Library Cart</Typography>
      {books.length !== 0 ? (
        <>
          {error && { error }}
          <List className="container">
            {books?.map((item) => (
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
                        <Typography variant="subtitle2">
                          {item.borrowDate?.split('T')[0]}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(Number(item.isbn))}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            ))}
          </List>
          <Button component={Link} to={'/dashboard'} variant="outlined" size="small">
            Back to dashboard
          </Button>
        </>
      ) : (
        <>
          <Alert severity="info" className="alert-info">
            Your cart is EMPTY!
          </Alert>
          <Button
            component={Link}
            to={'/dashboard'}
            variant="outlined"
            size="small"
            sx={{ marginTop: '5%' }}>
            Back to dashboard
          </Button>
        </>
      )}
    </Box>
  )
}

export default UserCart
