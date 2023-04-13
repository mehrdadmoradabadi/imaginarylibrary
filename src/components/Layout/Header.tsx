import { Badge, Button, IconButton, Toolbar, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { logoutUserThunk } from '../../features/authentication/authSlice'
import { RootState, useAppDispatch } from '../../store'
import { HeaderProps } from '../../features/types'
import { useSelector } from 'react-redux'

export default function Header(props: HeaderProps) {
  const { sections, title } = props
  const [cartitems, setCartitems] = useState<number>(0)
  const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated)
  const dispatch = useAppDispatch()
  let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks') || 'null')

  if (!borrowedBooks) {
    borrowedBooks = []
  }
  useEffect(() => {
    setCartitems(borrowedBooks.length)
  }, [borrowedBooks])
  function handleSignout() {
    dispatch(logoutUserThunk())
  }
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2, color: '#656363' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          component="h2"
          variant="h5"
          color="#656363"
          align="center"
          noWrap
          sx={{ flex: 1 }}>
          {title}
        </Typography>

        {isAuthenticated ? (
          <React.Fragment>
            <IconButton
              component={Link}
              to="/user-cart"
              sx={{ marginRight: '2%', color: '#656363' }}>
              <Badge badgeContent={cartitems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <Button
              onClick={handleSignout}
              to={'/'}
              variant="outlined"
              size="small"
              component={Link}>
              Sign out
            </Button>
          </React.Fragment>
        ) : (
          <Button variant="outlined" size="small" component={Link} to={'/signin'}>
            Sign in
          </Button>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>
        {sections.map((section) => (
          <Link
            style={{ color: '#656363', textDecoration: 'none' }}
            key={section.title}
            to={`/categories/${section.title.toLowerCase()}`}>
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  )
}
