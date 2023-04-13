export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

export interface User {
  username: string | null
  password: string | null
  isAuthenticated: boolean
  error: string | null
  type: Role | null
  id: string | null
  borrowedBooks: string[] | null
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
  authors: string[]
  status: Status
  borrowerId: string | null
  publishedDate: string | null
  borrowDate: string | null
  returnDate: string | null
  url: string
  genre: string
}

export interface HeaderProps {
  sections: ReadonlyArray<{
    title: string
  }>
  title: string
}
