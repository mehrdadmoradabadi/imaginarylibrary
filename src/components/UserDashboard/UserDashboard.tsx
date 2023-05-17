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
  CardActionArea,
  Grid,
  Pagination
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchBooksThunk, filterBookThunk } from '../../features/books/bookSlice'
import { RootState, useAppDispatch } from '../../store'
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

  return (
    <>
      <Toolbar component="nav" variant="dense" sx={{ backgroundColor: '#d8d8d8' }}>
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
            <Card sx={{ height: '100%' }}>
              <CardActionArea>
                <Link
                  to={`/books${bookChild.url}`}
                  style={{ textDecoration: 'none', color: 'black' }}>
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
                  <Typography sx={{ color: '#5858a5' }}>Read More & Borrow</Typography>
                </Link>
              </CardActionArea>
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
    </>
  )
}
