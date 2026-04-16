import type { User } from './user'

export interface AuthCredentials {
  phone: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}
