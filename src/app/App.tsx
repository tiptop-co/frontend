import { QueryProvider } from './providers/QueryProvider'
import { Router } from './Router'
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog'

export const App = () => (
  <QueryProvider>
    <Router />
    <ConfirmDialog />
  </QueryProvider>
)
