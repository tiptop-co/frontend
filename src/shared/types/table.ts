export type TableStatus = 'free' | 'unpaid' | 'paid'

export interface Table {
  id: string
  number: number
  venueId: string
  status: TableStatus
  waiterId?: string
  orderId?: string
  itemCount?: number
  totalAmount?: number
  hasActiveRequest?: boolean
}

export interface ClosedTableSession {
  id: string
  tableNumber: number
  itemCount: number
  totalAmount: number
  startTime: string
  endTime: string
}
