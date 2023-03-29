import * as React from 'react'
import Link from '@mui/material/Link'
import { Badge, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { logout } from '../../features/authentication/authSlice'
import { useAppDispatch } from '../../store'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
interface HeaderProps {
  sections: ReadonlyArray<{
    title: string
    url: string
  }>
  title: string
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props
  const [cartitems, setCartitems] = useState<number>(0)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('isAuthenticated') === 'true'
  )
  const dispatch = useAppDispatch()

  let userBorrowedBooks = JSON.parse(localStorage.getItem('userBorrowedBooks') || 'null')

  if (!userBorrowedBooks) {
    userBorrowedBooks = []
  }
  useEffect(() => {
    const totalBorrowedBooks = userBorrowedBooks.length
    setCartitems(totalBorrowedBooks)
  }, [userBorrowedBooks])
  function handleSignout() {
    dispatch(logout())
    setIsAuthenticated(false)
  }
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <IconButton onClick={() => navigate(-1)} color="inherit" sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}>
          {title}
        </Typography>

        {isAuthenticated ? (
          <React.Fragment>
            <IconButton href="/user-cart" color="inherit" sx={{ marginRight: '2%' }}>
              <Badge badgeContent={cartitems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <Button
              onClick={handleSignout}
              href={'/'}
              variant="outlined"
              size="small"
              component={Link}>
              Sign out
            </Button>
          </React.Fragment>
        ) : (
          <Button variant="outlined" size="small" component={Link} href={'/signin'}>
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
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}>
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  )
}
