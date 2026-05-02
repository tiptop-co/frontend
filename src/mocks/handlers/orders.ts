import { http, HttpResponse } from 'msw'
import { orders } from '../fixtures/orders'

export const orderHandlers = [
  http.get('/api/v1/tables/:tableId/order', ({ params }) => {
    const order = orders.find((o) => o.tableId === params.tableId)
    if (!order) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(order)
  }),

  http.post('/api/v1/orders', async ({ request }) => {
    const body = (await request.json()) as {
      tableId: string
      items: { dishId: string; quantity: number }[]
      wishes?: string
    }
    const newOrder = {
      id: crypto.randomUUID(),
      ...body,
      waiterId: 'w1',
      status: 'active',
      items: body.items.map((item, i) => ({
        id: `new-oi-${i}`,
        dishId: item.dishId,
        dishName: `Блюдо ${item.dishId}`,
        quantity: item.quantity,
        price: 0,
        status: 'unpaid',
      })),
      totalAmount: 0,
      paidAmount: 0,
      createdAt: new Date().toISOString(),
    }
    return HttpResponse.json(newOrder, { status: 201 })
  }),
]
