import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import UpdateIcon from '@mui/icons-material/Update'
import DeleteIcon from '@mui/icons-material/Delete'

import Title from '../Title/Title'
import { useAppDispatch, RootState } from '../../../store'
import { useEffect, useState, Fragment } from 'react'
import { deleteAuthorsThunk, fetchAllAuthorsThunk } from '../../../features/authors/authorsSlice'
import { Author } from '../../../features/types'
import { useSelector } from 'react-redux'
import NewAuthorForm from '../Forms/NewAuthorForm'
import { UpdateAuthorForm } from '../Forms/UpdateAuthorForm'

export default function Authors() {
  const dispatch = useAppDispatch()
  const authors: Author[] = useSelector((state: RootState) => state.authors.authors)
  const [operation, setOperation] = useState('')
  const [updateAuthor, setUpdateAuthorId] = useState<Author | null>(null)
  useEffect(() => {
    dispatch(fetchAllAuthorsThunk())
  }, [])

  function handleUpdateAuthor(updatedAuthor: Author) {
    setOperation('update')
    setUpdateAuthorId(updatedAuthor)
  }

  function handleAddNewAuthor(): void {
    setOperation('add')
  }

  return (
    <Fragment>
      <div className="admintitle">
        <IconButton sx={{ color: 'green' }} onClick={() => handleAddNewAuthor()}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
        <Title>All Books</Title>
      </div>
      {operation == 'add' ? <NewAuthorForm /> : null}
      {operation == 'update' && updateAuthor ? <UpdateAuthorForm author={updateAuthor} /> : null}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ cursor: 'pointer' }}>Id</TableCell>
            <TableCell sx={{ cursor: 'pointer' }}>Name</TableCell>
            <TableCell>Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author.id}>
              <TableCell>{author.id}</TableCell>
              <TableCell>{author.name}</TableCell>
              <TableCell sx={{ display: 'flex' }}>
                <IconButton sx={{ color: 'goldenrod' }} onClick={() => handleUpdateAuthor(author)}>
                  <UpdateIcon />
                </IconButton>
                <IconButton
                  sx={{ color: 'red' }}
                  onClick={() => dispatch(deleteAuthorsThunk(author.id))}>
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
