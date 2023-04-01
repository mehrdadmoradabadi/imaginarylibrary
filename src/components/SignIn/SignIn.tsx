import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Alert,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Avatar,
  Container,
  Typography
} from '@mui/material'

import { useAppDispatch, RootState } from '../../store'
import { loginUsersThunk } from '../../features/authentication/authSlice'
import { Role, User } from '../../features/types'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
      {'Copyright © '}
      <Link color="inherit" href="https://localhost/">
        Imaginary library
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function SignIn() {
  const [user, setUser] = useState<Partial<User> | undefined>()
  const { error, isAuthenticated, role } = useSelector((state: RootState) => state.authentication)
  const dispatch = useAppDispatch()
  if (isAuthenticated && role === Role.USER) {
    return <Navigate to="/dashboard" />
  }
  if (isAuthenticated && role === Role.ADMIN) {
    return <Navigate to="/admin-panel" />
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newUser: User = {
      username: user?.username ?? '',
      password: user?.password ?? '',
      isAuthenticated: false,
      error: null,
      type: null,
      id: null,
      borrowedBooks: null
    }

    dispatch(loginUsersThunk(newUser))
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          {error && <Alert severity="error">{error}</Alert>}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={handleChange}
              // onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  )
}
