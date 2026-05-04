import { http, HttpResponse } from 'msw'
import { dishes, categories } from '../fixtures/dishes'

export const menuHandlers = [
  http.get('/api/v1/tables/:tableId/menu', () => {
    return HttpResponse.json({ dishes, categories })
  }),

  http.get('/api/v1/dishes/:id', ({ params }) => {
    const dish = dishes.find((d) => d.id === params.id)
    if (!dish) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(dish)
  }),
]
