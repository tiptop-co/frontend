import { http, HttpResponse } from 'msw'
import { tables, closedSessions } from '../fixtures/tables'
import { orders } from '../fixtures/orders'
import { waiterRequests } from '../fixtures/requests'

export const waiterHandlers = [
  http.get('/api/waiter/tables', () => {
    return HttpResponse.json({ active: tables, history: closedSessions })
  }),

  http.get('/api/waiter/tables/:tableId', ({ params }) => {
    const table = tables.find((t) => t.id === params.tableId)
    if (!table) return new HttpResponse(null, { status: 404 })
    const order = orders.find((o) => o.tableId === params.tableId) ?? null
    const requests = waiterRequests.filter(
      (r) => r.tableId === params.tableId,
    )
    return HttpResponse.json({ table, order, requests })
  }),

  http.get('/api/waiter/requests', () => {
    return HttpResponse.json({ data: waiterRequests })
  }),

  http.post('/api/waiter/requests/:id/accept', ({ params }) => {
    const req = waiterRequests.find((r) => r.id === params.id)
    if (!req) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json({ ...req, status: 'accepted' })
  }),

  http.post('/api/waiter/tables/:tableId/close', ({ params }) => {
    const table = tables.find((t) => t.id === params.tableId)
    if (!table) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json({ ...table, status: 'free' })
  }),

  http.get('/api/waiter/tips/today', () => {
    return HttpResponse.json({ amount: 1350 })
  }),

  http.put('/api/profile', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json(body)
  }),

  http.post('/api/profile/password', async () => {
    return HttpResponse.json({ success: true })
  }),
]
