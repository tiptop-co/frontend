export type UserRole = 'guest' | 'waiter' | 'manager' | 'admin'

export interface User {
  id: string
  firstName: string
  lastName: string
  phone: string
  role: UserRole
  venueId?: string
  venueName?: string
  createdAt: string
}

export interface CreateUserDto {
  firstName: string
  lastName: string
  phone: string
  role: UserRole
  venueId?: string
}
