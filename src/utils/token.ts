import jwt_decode from 'jwt-decode'

import { isDecodedUser } from '../features/types'

export function getDecodedTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null
  const decodedUser = jwt_decode(token)
  if (!isDecodedUser(decodedUser)) return null
  return decodedUser
}
