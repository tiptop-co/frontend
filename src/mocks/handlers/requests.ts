import { http, HttpResponse } from 'msw'
import { waiterRequests } from '../fixtures/requests'

export const requestHandlers = [
  http.get('/api/v1/tables/:tableId/call-status', () => {
    return HttpResponse.json({ canCall: true })
  }),

  http.get('/api/v1/tables/:tableId/requests', ({ params }) => {
    const reqs = waiterRequests.filter((r) => r.tableId === params.tableId)
    return HttpResponse.json({ data: reqs })
  }),

  http.post('/api/v1/requests', async ({ request }) => {
    const body = (await request.json()) as { tableId: string }
    const newReq = {
      id: crypto.randomUUID(),
      tableId: body.tableId,
      tableNumber: Number(body.tableId),
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    return HttpResponse.json(newReq, { status: 201 })
  }),
]
