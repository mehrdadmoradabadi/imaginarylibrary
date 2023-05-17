import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Alert,
  Button,
  CssBaseline,
  TextField,
  Box,
  Avatar,
  Container,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { Role, User } from '../../features/types'
import { Link, Navigate } from 'react-router-dom'
import { useAppDispatch } from '../../store'
import { signUpUsersThunk } from '../../features/authentication/authSlice'

const theme = createTheme()

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
      {'Copyright © '}
      <Link color="inherit" to="https://localhost:5173/">
        Imaginary library
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function SignUp() {
  const [user, setUser] = useState<Partial<User> | undefined>()
  const [error, setError] = useState<string | null>()
  const [message, setMessage] = useState<string | null>()
  const dispatch = useAppDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (user?.password !== user?.confirmPassword) {
      return setError('Password does not match')
    }
    console.log(user)
    const newUser: User = {
      username: user?.username ?? '',
      password: user?.password ?? '',
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      confirmPassword: user?.confirmPassword ?? '',
      borrowedBooks: [],
      role: Role.USER,
      isAuthenticated: false,
      error: null,
      id: null
    }
    dispatch(signUpUsersThunk(newUser))
    setMessage('Successful ')
  }
  if (message) {
    return <Navigate to="/signin" />
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
          {message && <Alert severity="success">{message}</Alert>}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Join us !
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email"
              name="username"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoFocus
              onChange={handleChange}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  )
}
