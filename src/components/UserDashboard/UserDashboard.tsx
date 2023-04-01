import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  InputBase,
  Toolbar,
  styled,
  alpha,
  Box,
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Link,
  Pagination
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { useState } from 'react'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { fetchBooksThunk, filterBookThunk } from '../../features/books/bookSlice'
import { RootState, useAppDispatch } from '../../store'
import Header from '../Home/Header'
import Footer from '../Home/Footer'
import './UserDashboard.css'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  margin: theme.spacing(2, 0),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '40ch'
      }
    }
  }
}))

export default function UserDashboard() {
  const dispatch = useAppDispatch()
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const { books, error } = useSelector((state: RootState) => state.books)
  useEffect(() => {
    if (searchQuery) {
      dispatch(filterBookThunk(searchQuery))
    } else {
      dispatch(fetchBooksThunk())
    }
  }, [dispatch, searchQuery])

  let skip = (page - 1) * 9
  const end = skip + 9 - 1
  const booklist = books.slice(skip, end)

  if (end > books.length) {
    skip -= 1
  }

  if (!isAuthenticated) {
    return <Navigate to={'/'} />
  }
  return (
    <>
      <Header title="Imaginary Library" sections={[]} />
      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: 'space-between',
          overflowX: 'auto',
          borderTop: 1,
          borderColor: 'divider'
        }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>
      </Toolbar>

      <Box className="search-box"></Box>
      {error && <p>{error}</p>}
      <Grid container spacing={2} className="card">
        {booklist.map((bookChild) => (
          <Grid item xs={8} sm={3} md={3} key={bookChild.isbn}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100%"
                  width="100%"
                  image="/book.jpg"
                  alt={bookChild.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {bookChild.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    overflow={'ellipsis'}
                    color="text.secondary"
                    sx={{ whiteSpace: 'normal' }}>
                    {bookChild.description}
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
              </CardActionArea>
              <Link href={`/books${bookChild.url}`}>
                <Button size="small" color="primary">
                  Read More & Borrow
                </Button>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        className="pagination"
        count={Math.floor(books.length / 9) + 1}
        onChange={(e, value) => {
          setPage(value)
          window.scrollTo(0, 0)
        }}
      />
      <Footer
        title="Thank you"
        description="Thank you for visiting the Imaginary Library! We hope you found what you were looking for and enjoyed your experience with us. Remember, the library is always here for you, whether you're looking for a good book to read, a virtual event to attend, or a friendly face to talk to. Keep exploring, keep learning, and keep reading!"
      />
    </>
  )
}
