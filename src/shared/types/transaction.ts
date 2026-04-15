export type TransactionStatus = 'pending' | 'success' | 'failed'

export interface Transaction {
  id: string
  orderId: string
  amount: number
  tipsAmount: number
  status: TransactionStatus
  itemIds: string[]
  createdAt: string
}

export interface CreateTransactionDto {
  orderId: string
  itemIds: string[]
  tipsAmount: number
}
