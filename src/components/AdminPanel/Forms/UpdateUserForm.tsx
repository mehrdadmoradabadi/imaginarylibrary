import { ChangeEvent, useState } from 'react'
import { Role, User } from '../../../features/types'
import { RootState, useAppDispatch } from '../../../store'
import { SelectChangeEvent } from '@mui/material/Select'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useSelector } from 'react-redux'
import { updateUserThunk } from '../../../features/users/usersSlice'

export function UpdateUserForm({
  username,
  open,
  onClose
}: {
  username: string
  open: boolean
  onClose: () => void
}) {
  // const [open, setOpen] = useState(false)
  const updatedUser = useSelector((state: RootState) =>
    state.users.users.find((user) => user.username === username)
  )
  if (!updatedUser) {
    return <>No user Found!</>
  }
  const [state, setState] = useState<User>(updatedUser)
  const dispatch = useAppDispatch()
  if (state.username !== updatedUser.username) {
    setState(updatedUser)
    onClose()
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setState((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSelect = (event: SelectChangeEvent<Role>) => {
    setState((prevState: User) => ({
      ...prevState,
      role: event.target.value as Role | '' | undefined
    }))
  }

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={() => onClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{`Updating: ${state.username}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="firstName">Update Name: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            type="text"
            fullWidth
            variant="standard"
            value={state.firstName}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText id="firstName">Update Lastname: </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="lasttName"
            type="text"
            fullWidth
            variant="standard"
            value={state.lastName}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText id="firstName">Update Role: </DialogContentText>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="role"
            name="role"
            value={state.role}
            onChange={handleSelect}>
            <MenuItem value={Role.ADMIN}>ADMIN</MenuItem>
            <MenuItem value={Role.USER}>User</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>Cancle</Button>
          <Button
            onClick={() => {
              dispatch(updateUserThunk(state))
              onClose()
            }}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
