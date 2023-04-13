import { Book, Status } from '../../../features/types'
import { addBookThunk } from '../../../features/books/bookSlice'
import { useAppDispatch } from '../../../store'
import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'

export default function NewBookForm() {
  const [open, setOpen] = useState(true)

  const dispatch = useAppDispatch()
  const [newBook, setNewBook] = useState<Partial<Book> | undefined>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setNewBook((prev) => ({
      ...prev,
      [name]: name === 'authors' ? value.split(',') : value
    }))
  }
  const handleSubmit = () => {
    if (newBook?.title && newBook?.description) {
      const book: Book = {
        isbn: newBook?.isbn ?? '',
        publisher: newBook?.publisher ?? '',
        authors: newBook?.authors ?? [],
        status: Status.AVAILABLE,
        borrowerId: null,
        publishedDate: newBook?.publishedDate ?? '',
        borrowDate: null,
        returnDate: null,
        url: `/${newBook.isbn}`,
        genre: newBook?.genre ?? '',
        title: newBook.title,
        description: newBook.description
      }
      dispatch(addBookThunk(book))
      setOpen(false)
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{`Adding New Book`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="title"> Title:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            type="text"
            fullWidth
            variant="standard"
            placeholder="Title"
            onChange={handleChange}
          />
          <DialogContentText id="title"> Description:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="description"
            type="text"
            fullWidth
            variant="standard"
            placeholder="Description"
            onChange={handleChange}
          />
          <DialogContentText id="title">Isbn:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="isbn"
            type="text"
            fullWidth
            variant="standard"
            placeholder="ISBN"
            onChange={handleChange}
          />
          <DialogContentText id="title"> Publisher:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="publisher"
            type="text"
            fullWidth
            variant="standard"
            placeholder="Publisher"
            onChange={handleChange}
          />
          <DialogContentText id="title"> Authors:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="authors"
            type="Array"
            fullWidth
            variant="standard"
            placeholder="Authors"
            onChange={handleChange}
          />
          <DialogContentText id="title"> PublishedDate:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="publishedDate"
            type="date"
            fullWidth
            variant="standard"
            placeholder="publishedDate"
            onChange={handleChange}
          />
          <DialogContentText id="title"> Genre:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="genre"
            type="text"
            fullWidth
            variant="standard"
            placeholder="Genre"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancle</Button>
          <Button onClick={handleSubmit}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
