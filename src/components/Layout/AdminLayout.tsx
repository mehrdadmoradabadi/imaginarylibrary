import { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { loadUsersFromStorage } from '../../features/authentication/authSlice'
import { Role } from '../../features/types'

export default function AdminLayout({ children }: { children: ReactNode }) {
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
  const logedInRole = logedInUser?.role
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (logedInRole !== Role.ADMIN && currentLocation.pathname !== '/') {
    return <Navigate to={'/'} />
  }
  return <>{children}</>
}
