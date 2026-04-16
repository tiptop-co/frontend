import { http, HttpResponse } from 'msw'
import { users } from '../fixtures/users'
import { adminStats } from '../fixtures/admin'

export const adminHandlers = [
  http.get('/api/admin/managers', () => {
    const managers = users.filter((u) => u.role === 'manager')
    return HttpResponse.json({ data: managers })
  }),

  http.post('/api/admin/managers', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json(
      { id: crypto.randomUUID(), ...body, role: 'manager', createdAt: new Date().toISOString() },
      { status: 201 },
    )
  }),

  http.delete('/api/admin/managers/:id', () => {
    return new HttpResponse(null, { status: 204 })
  }),

  http.get('/api/admin/stats', () => {
    return HttpResponse.json(adminStats)
  }),
]
