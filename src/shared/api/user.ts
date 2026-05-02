import type { User, UserRole } from '@/shared/types'

const ROLE_BY_INT: Record<number, UserRole> = {
  1: 'guest',
  2: 'waiter',
  3: 'manager',
  4: 'admin',
}

type ApiUser = Omit<User, 'role'> & { role: number | UserRole }

export const normalizeUser = (u: ApiUser): User => ({
  ...u,
  role:
    typeof u.role === 'number' ? ROLE_BY_INT[u.role] ?? 'guest' : u.role,
})

export type { ApiUser }
