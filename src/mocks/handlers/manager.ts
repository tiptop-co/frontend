import { http, HttpResponse } from 'msw'
import { dishes, categories } from '../fixtures/dishes'
import { venue } from '../fixtures/venue'
import { users } from '../fixtures/users'
import { tables } from '../fixtures/tables'
import { managerStats } from '../fixtures/stats'

export const managerHandlers = [
  http.get('/api/v1/manager/menu', () => {
    return HttpResponse.json({ dishes, categories })
  }),

  http.post('/api/v1/manager/dishes', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json(
      { id: crypto.randomUUID(), ...body, venueId: 'v1' },
      { status: 201 },
    )
  }),

  http.delete('/api/v1/manager/dishes/:id', () => {
    return new HttpResponse(null, { status: 204 })
  }),

  http.get('/api/v1/manager/venue', () => {
    return HttpResponse.json(venue)
  }),

  http.put('/api/v1/manager/venue', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ ...venue, ...body })
  }),

  http.get('/api/v1/manager/waiters', () => {
    const waiters = users
      .filter((u) => u.role === 'waiter')
      .map((u) => ({
        ...u,
        tablesServedToday: Math.floor(Math.random() * 8) + 1,
        tipsToday: Math.floor(Math.random() * 2000) + 500,
      }))
    return HttpResponse.json({ data: waiters })
  }),

  http.get('/api/v1/dishes/:id', ({ params }) => {
    const dish = dishes.find((d) => d.id === params.id)
    if (!dish) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(dish)
  }),

  http.post('/api/v1/manager/waiters', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json(
      { id: crypto.randomUUID(), ...body, role: 'waiter', createdAt: new Date().toISOString() },
      { status: 201 },
    )
  }),

  http.delete('/api/v1/manager/waiters/:id', () => {
    return new HttpResponse(null, { status: 204 })
  }),

  http.get('/api/v1/manager/tables', () => {
    return HttpResponse.json({ tables })
  }),

  http.post('/api/v1/manager/tables', async ({ request }) => {
    const body = (await request.json()) as { number: number }
    return HttpResponse.json(
      { id: crypto.randomUUID(), number: body.number, status: 'free', venueId: 'v1', itemCount: 0, totalAmount: 0, hasActiveRequest: false },
      { status: 201 },
    )
  }),

  http.delete('/api/v1/manager/tables/:id', () => {
    return new HttpResponse(null, { status: 204 })
  }),

  http.get('/api/v1/manager/stats', () => {
    return HttpResponse.json(managerStats)
  }),
]
