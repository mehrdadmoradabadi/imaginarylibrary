export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  username: string | null
  password: string | null
  confirmPassword: string | null
  firstName: string | null
  lastName: string | null
  isAuthenticated: boolean
  error: string | null
  role: Role | '' | undefined
  userId: string | null
  borrowedBooks: string[] | null
}
export interface AuthUser {
  username: string | null
  password: string | null
}
export interface DecodedUser {
  username: string
  user_id: number
  role: Role
}
export enum Status {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable'
}
export interface Book {
  isbn: string
  title: string
  description: string
  publisher: string
  authors: Authors[]
  status: Status
  borrowerId: string | null
  publishedDate: string | null
  borrowDate: string | null
  returnDate: string | null
  url: string
  genre: string
  imageUrl: string
}
export interface Authors {
  id: number
  name: string
}

export interface HeaderProps {
  sections: ReadonlyArray<{
    title: string
  }>
  title: string
}

export function isDecodedUser(obj: unknown): obj is DecodedUser {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'username' in obj &&
    'role' in obj &&
    'user_id' in obj
  )
}

export interface Author {
  id: number
  name: string
}
