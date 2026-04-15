import { http, HttpResponse } from 'msw'

export const transactionHandlers = [
  http.post('/api/transactions', async ({ request }) => {
    const body = (await request.json()) as {
      orderId: string
      itemIds: string[]
      tipsAmount: number
    }
    return HttpResponse.json(
      {
        id: crypto.randomUUID(),
        ...body,
        amount: 0,
        status: 'success',
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    )
  }),
]
