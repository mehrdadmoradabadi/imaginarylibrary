import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }: { children: ReactNode }) {
  const isAuthenticated = useSelector((state: RootState) => state.authentication.isAuthenticated)
  const currentLocation = useLocation()
  const sections = [
    { title: 'Fantasy' },
    { title: 'Horror' },
    { title: 'Mystery' },
    { title: 'Romance' },
    { title: 'Thriller' }
  ]
  if (!isAuthenticated && currentLocation.pathname !== '/') {
    return <Navigate to={'/'} />
  }
  return (
    <div>
      {isAuthenticated ? (
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
