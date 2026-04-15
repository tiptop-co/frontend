export type RequestStatus = 'pending' | 'accepted' | 'done'

export interface WaiterRequest {
  id: string
  tableId: string
  tableNumber: number
  waiterId?: string
  status: RequestStatus
  createdAt: string
}

export interface CreateWaiterRequestDto {
  tableId: string
}
