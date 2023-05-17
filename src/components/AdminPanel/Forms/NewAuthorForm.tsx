import { Author } from '../../../features/types'
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
import { addAuthorsThunk } from '../../../features/authors/authorsSlice'

export default function NewAuthorForm() {
  const [open, setOpen] = useState(true)

  const dispatch = useAppDispatch()
  const [newAuthor, setNewAuthor] = useState<Partial<Author> | undefined>()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setNewAuthor((prev) => ({
      ...prev,
      [name]: name === 'authors' ? value.split(',') : value
    }))
  }
  const handleSubmit = () => {
    if (newAuthor?.name) {
      const author: Author = {
        name: newAuthor.name,
        id: 0
      }
      dispatch(addAuthorsThunk(author))
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
          <DialogContentText id="name"> Name: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            placeholder="Name"
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
