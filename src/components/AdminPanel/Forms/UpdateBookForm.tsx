import { useState } from 'react'
import { Book } from '../../../features/types'
import { useAppDispatch } from '../../../store'
import { updateBooksThunk } from '../../../features/books/bookSlice'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'

export function UpdateBookForm({ book }: { book: Book }) {
  const [open, setOpen] = useState(true)
  const [state, setState] = useState<Book>(book)
  const dispatch = useAppDispatch()

  if (state.isbn !== book.isbn) {
    setState(book)
    setOpen(!open)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setState((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{`Updating: ${state.title}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="title">New Title:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            type="text"
            fullWidth
            variant="standard"
            value={state.title}
            onChange={handleChange}
          />
          <DialogContentText id="title">New Description:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="description"
            type="text"
            fullWidth
            variant="standard"
            value={state.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancle</Button>
          <Button
            onClick={() => {
              dispatch(updateBooksThunk(state))
              setOpen(false)
            }}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
