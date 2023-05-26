import { Fragment, useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '../../../store'
import { deleteUserThunk, fetchAllUsersThunk } from '../../../features/users/usersSlice'
import { useSelector } from 'react-redux'
import Title from '../Title/Title'
import { IconButton, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import UpdateIcon from '@mui/icons-material/Update'
import DeleteIcon from '@mui/icons-material/Delete'
import { UpdateUserForm } from '../Forms/UpdateUserForm'

export default function Users() {
  const { users } = useSelector((state: RootState) => state.users)
  const [sortedBy, setSortedBy] = useState('username')
  const [updatedUser, setUpdatedUser] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllUsersThunk())
  }, [updatedUser])

  let sortedUsers = users
  if (sortedBy === 'username') {
    sortedUsers = [...users].sort((a, b) => {
      if (a.username && b.username) {
        return a.username.localeCompare(b.username)
      }
      return 0
    })
  } else if (sortedBy === 'role') {
    sortedUsers = [...users].sort((a, b) => {
      if (a.role && b.role) {
        return a.role.localeCompare(b.role)
      }
      return 0
    })
  } else if (sortedBy === 'firstname') {
    sortedUsers = [...users].sort((a, b) => {
      if (a.firstName && b.firstName) {
        return a.firstName.localeCompare(b.firstName)
      }
      return 0
    })
  } else if (sortedBy === 'lastname') {
    sortedUsers = [...users].sort((a, b) => {
      if (a.lastName && b.lastName) {
        return a.lastName.localeCompare(b.lastName)
      }
      return 0
    })
  }
  const handleOpenForm = (username: string | null) => {
    setUpdatedUser(username)
  }
  const handleCloseForm = () => {
    setUpdatedUser(null)
  }
  return (
    <Fragment>
      <div className="admintitle">
        <Title>All Users</Title>
      </div>
      {updatedUser && (
        <UpdateUserForm username={updatedUser} open={true} onClose={handleCloseForm} />
      )}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => setSortedBy('username')} sx={{ cursor: 'pointer' }}>
              Username
            </TableCell>
            <TableCell onClick={() => setSortedBy('role')} sx={{ cursor: 'pointer' }}>
              Role
            </TableCell>
            <TableCell onClick={() => setSortedBy('firstname')} sx={{ cursor: 'pointer' }}>
              FirstName
            </TableCell>
            <TableCell onClick={() => setSortedBy('lastname')} sx={{ cursor: 'pointer' }}>
              LastName
            </TableCell>
            <TableCell>Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.username}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell sx={{ display: 'flex' }}>
                <IconButton
                  sx={{ color: 'goldenrod' }}
                  onClick={() => handleOpenForm(user.username)}>
                  <UpdateIcon />
                </IconButton>
                <IconButton sx={{ color: 'red' }} onClick={() => dispatch(deleteUserThunk(user))}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  )
}
