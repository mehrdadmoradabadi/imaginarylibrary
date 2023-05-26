import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { loadUsersFromStorage } from '../../features/authentication/authSlice'
import { Role } from '../../features/types'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const currentLocation = useLocation()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadUsersFromStorage())
  }, [])

  const logedInUser = useSelector((state: RootState) => state.authentication.logedInUser)
  const logedInRole = logedInUser?.role
  if (logedInRole !== Role.ADMIN && currentLocation.pathname !== '/') {
    return <Navigate to={'/'} />
  }
  return <>{children}</>
}
