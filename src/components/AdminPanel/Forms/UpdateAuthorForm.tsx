import { useState } from 'react'
import { Author } from '../../../features/types'
import { useAppDispatch } from '../../../store'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'
import { updateAuthorsThunk } from '../../../features/authors/authorsSlice'

export function UpdateAuthorForm({ author }: { author: Author }) {
  const [open, setOpen] = useState(true)
  const [state, setState] = useState<Author>(author)
  const dispatch = useAppDispatch()

  if (state.id !== author.id) {
    setState(author)
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
        <DialogTitle>{`Updating: ${state.name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="title">Update name: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            value={state.name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancle</Button>
          <Button
            onClick={() => {
              dispatch(updateAuthorsThunk(state))
              setOpen(false)
            }}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
