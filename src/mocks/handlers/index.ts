import type { RequestHandler } from 'msw'
import { menuHandlers } from './menu'
import { orderHandlers } from './orders'
import { transactionHandlers } from './transactions'
import { requestHandlers } from './requests'
import { authHandlers } from './auth'
import { waiterHandlers } from './waiter'
import { managerHandlers } from './manager'
import { adminHandlers } from './admin'

export const handlers: RequestHandler[] = [
  ...menuHandlers,
  ...orderHandlers,
  ...transactionHandlers,
  ...requestHandlers,
  ...authHandlers,
  ...waiterHandlers,
  ...managerHandlers,
  ...adminHandlers,
]
