import type { Order } from '@/shared/types'

export const orders: Order[] = [
  {
    id: 'o1',
    tableId: '5',
    waiterId: 'w1',
    status: 'active',
    items: [
      {
        id: 'oi1',
        dishId: 'd9',
        dishName: 'Том Ям',
        quantity: 1,
        price: 590,
        status: 'paid',
      },
      {
        id: 'oi2',
        dishId: 'd1',
        dishName: 'Борщ с говядиной',
        quantity: 1,
        price: 490,
        status: 'unpaid',
      },
      {
        id: 'oi3',
        dishId: 'd2',
        dishName: 'Цезарь с курицей',
        quantity: 1,
        price: 520,
        status: 'unpaid',
      },
      {
        id: 'oi4',
        dishId: 'd8',
        dishName: 'Морс клюквенный',
        quantity: 2,
        price: 460,
        status: 'unpaid',
        addedLater: true,
      },
    ],
    totalAmount: 2060,
    paidAmount: 590,
    wishes: 'Без лука',
    createdAt: '2026-04-11T14:23:00Z',
  },
]
