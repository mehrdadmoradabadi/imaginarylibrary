import { useEffect } from 'react'
import { useSelector } from 'react-redux'

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
  const { books, error, isbn } = useSelector((state: RootState) => state.cart)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCartItemsThunk())
  }, [])

  const handleDelete = (id: string) => {
    dispatch(removeFromCartThunk(id))
  }
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">Library Cart</Typography>
      {isbn.length !== 0 ? (
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
