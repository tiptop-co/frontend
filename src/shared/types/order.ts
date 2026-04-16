export type OrderStatus = 'active' | 'completed'

export type OrderItemStatus = 'unpaid' | 'paid'

export interface OrderItem {
  id: string
  dishId: string
  dishName: string
  quantity: number
  price: number
  status: OrderItemStatus
  addedLater?: boolean
}

export interface Order {
  id: string
  tableId: string
  waiterId?: string
  status: OrderStatus
  items: OrderItem[]
  totalAmount: number
  paidAmount: number
  wishes?: string
  createdAt: string
}

export interface CreateOrderDto {
  tableId: string
  items: { dishId: string; quantity: number }[]
  wishes?: string
}
