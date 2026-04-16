import type { Table, ClosedTableSession } from '@/shared/types'

export const tables: Table[] = [
  {
    id: '3',
    number: 3,
    venueId: 'v1',
    status: 'unpaid',
    waiterId: 'w1',
    orderId: 'o3',
    itemCount: 5,
    totalAmount: 2340,
    hasActiveRequest: false,
  },
  {
    id: '5',
    number: 5,
    venueId: 'v1',
    status: 'unpaid',
    waiterId: 'w1',
    orderId: 'o1',
    itemCount: 4,
    totalAmount: 2060,
    hasActiveRequest: true,
  },
  {
    id: '8',
    number: 8,
    venueId: 'v1',
    status: 'paid',
    waiterId: 'w1',
    orderId: 'o8',
    itemCount: 7,
    totalAmount: 4120,
    hasActiveRequest: false,
  },
  {
    id: '12',
    number: 12,
    venueId: 'v1',
    status: 'free',
    waiterId: 'w1',
    itemCount: 0,
    totalAmount: 0,
    hasActiveRequest: false,
  },
]

export const closedSessions: ClosedTableSession[] = [
  {
    id: 'cs1',
    tableNumber: 2,
    itemCount: 3,
    totalAmount: 1580,
    startTime: '12:05',
    endTime: '13:40',
  },
  {
    id: 'cs2',
    tableNumber: 5,
    itemCount: 6,
    totalAmount: 3210,
    startTime: '11:20',
    endTime: '12:50',
  },
]
