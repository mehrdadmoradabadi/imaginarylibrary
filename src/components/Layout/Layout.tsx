import { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import { loadUsersFromStorage } from '../../features/authentication/authSlice'

export default function Layout({ children }: { children: ReactNode }) {
  const currentLocation = useLocation()
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const loadUserData = async () => {
      await dispatch(loadUsersFromStorage())
      setIsLoading(false) // Set loading state to false after data is loaded
    }

    loadUserData()
  }, [dispatch])
  const logedInUser = useSelector((state: RootState) => state.authentication.logedInUser)
  const sections = [
    { title: 'Fantasy' },
    { title: 'Horror' },
    { title: 'Mystery' },
    { title: 'Romance' },
    { title: 'Thriller' }
  ]

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!logedInUser && currentLocation.pathname !== '/') {
    return <Navigate to={'/'} />
  }
  return (
    <div>
      {logedInUser ? (
        <Header title="Imaginary Library" sections={sections} />
      ) : (
        <Header title="Imaginary Library" sections={[]} />
      )}
      {children}
      <Footer
        title="Thank you"
        description="Thank you for visiting the Imaginary Library! We hope you found what you were looking for and enjoyed your experience with us. Remember, the library is always here for you, whether you're looking for a good book to read, a virtual event to attend, or a friendly face to talk to. Keep exploring, keep learning, and keep reading!"
      />
    </div>
  )
}
