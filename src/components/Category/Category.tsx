import { useParams, Link } from 'react-router-dom'
import { categoryBookThunk } from '../../features/books/bookSlice'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActionArea,
  Grid,
  Pagination
} from '@mui/material'
import { useEffect, useState } from 'react'

export default function Category() {
  const dispatch = useAppDispatch()
  const { category } = useParams<string>()
  const [page, setPage] = useState(1)
  const { books, error } = useSelector((state: RootState) => state.books)
  useEffect(() => {
    dispatch(categoryBookThunk(category ?? ''))
  }, [dispatch, category])
  let skip = (page - 1) * 9
  const end = skip + 9 - 1
  const booklist = books.slice(skip, end)

  if (end >= books.length) {
    skip -= 1
  }
  return (
    <div>
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
                  {/* <CardActions></CardActions> */}
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
      {category}
    </div>
  )
}
