import { useState } from 'react'
import { Book } from '../../../features/types'
import { useAppDispatch } from '../../../store'
import { updateBooksThunk, uploadBookCoverThunk } from '../../../features/books/bookSlice'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
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
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      dispatch(uploadBookCoverThunk({ bookIsbn: Number(state.isbn), bookImage: file }))
    }
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
          <DialogContentText id="cover"> Cover:</DialogContentText>
          <Input type="file" onChange={handleCoverUpload} />
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
