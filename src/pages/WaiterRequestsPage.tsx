import { useState } from 'react'
import { useWaiterRequests, useAcceptRequest } from '@/features/waiter'
import type { RequestStatus } from '@/shared/types'

type FilterValue = 'all' | 'pending' | 'done'

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'pending', label: 'Ожидание' },
  { value: 'done', label: 'Обработано' },
]

const DOT_STYLES: Record<RequestStatus, string> = {
  pending: 'bg-amber-500 animate-pulse',
  accepted: 'bg-forest',
  done: 'bg-[#C4BFB7]',
}

const STATUS_LABELS: Record<RequestStatus, { text: string; className: string }> = {
  pending: { text: 'Ожидание', className: 'text-amber-600' },
  accepted: { text: 'Принята', className: 'text-forest' },
  done: { text: 'Обработана', className: 'text-muted' },
}

export const WaiterRequestsPage = () => {
  const { data: requests, isLoading } = useWaiterRequests()
  const { mutate: accept } = useAcceptRequest()
  const [filter, setFilter] = useState<FilterValue>('all')

  const filtered =
    filter === 'all'
      ? requests
      : filter === 'pending'
        ? requests?.filter((r) => r.status === 'pending')
        : requests?.filter((r) => r.status !== 'pending')

  return (
    <>
      <div className="sticky top-0 z-10 bg-cream px-5 pt-4 pb-3">
        <h1 className="text-2xl font-bold">Заявки</h1>
      </div>

      <div className="flex gap-2 px-5 pb-4">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-[7px] rounded-full text-sm font-medium border-[1.5px] whitespace-nowrap cursor-pointer ${
              filter === f.value
                ? 'bg-terra text-white border-terra'
                : 'bg-white text-muted border-muted-bg'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="px-5 flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted text-center py-10">Загрузка...</p>
        )}
        {filtered?.map((req) => {
          const statusInfo = STATUS_LABELS[req.status]
          return (
            <div
              key={req.id}
              className="bg-white rounded-[14px] p-4 px-[18px] shadow-card"
            >
              <div className="text-[13px] text-muted mb-1.5">
                Стол {req.tableNumber}
              </div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${DOT_STYLES[req.status]}`}
                />
                <span className="text-[15px] font-semibold flex-1">
                  Вызов официанта
                </span>
                <span className="text-[13px] text-muted">
                  {new Date(req.createdAt).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2.5">
                <span className={`text-[13px] font-medium ${statusInfo.className}`}>
                  {statusInfo.text}
                </span>
                {req.status === 'pending' && (
                  <button
                    onClick={() => accept(req.id)}
                    className="px-5 py-2 text-sm font-semibold text-white bg-terra border-none rounded-[10px] cursor-pointer active:opacity-85"
                  >
                    Принять
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
