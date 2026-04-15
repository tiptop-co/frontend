import { http, HttpResponse } from 'msw'
import { users } from '../fixtures/users'

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { phone: string; password: string }
    const normalize = (p: string) => p.replace(/\D/g, '')
    const user = users.find((u) => normalize(u.phone) === normalize(body.phone))
    if (!user) {
      return HttpResponse.json(
        { message: 'Неверный телефон или пароль' },
        { status: 401 },
      )
    }
    return HttpResponse.json({
      token: `mock-token-${user.id}`,
      user,
    })
  }),
]
