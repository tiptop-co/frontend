import { useParams } from 'react-router-dom'
import { useCallStatus, useTableRequests, useCallWaiter } from '@/features/call-waiter'

export const GuestCallWaiterPage = () => {
  const { tableId } = useParams<{ tableId: string }>()
  const { data: callStatus } = useCallStatus(tableId!)
  const { data: requests } = useTableRequests(tableId!)
  const { mutate: call, isPending } = useCallWaiter(tableId!)

  const canCall = callStatus?.canCall ?? false
  const pendingRequests = requests?.filter((r) => r.status === 'pending') ?? []

  const handleCall = () => {
    call({ tableId: tableId! })
  }

  return (
    <>
      <div className="sticky top-0 z-10 bg-cream px-5 py-4 border-b border-muted-bg">
        <h1 className="text-xl font-bold">Вызов официанта</h1>
      </div>

      <div className="flex flex-col items-center px-6 pt-12 pb-8 text-center">
        <div className="text-[64px] mb-5">🔔</div>
        <p className="text-[15px] text-[#666] leading-relaxed mb-7 max-w-[280px]">
          {canCall
            ? <>Нажмите кнопку, чтобы вызвать официанта к&nbsp;столу&nbsp;{tableId}</>
            : 'Вызов официанта сейчас недоступен'}
        </p>
        <button
          onClick={handleCall}
          disabled={isPending || !canCall}
          className="w-[180px] h-[180px] rounded-full bg-terra text-white border-none text-[17px] font-bold cursor-pointer flex items-center justify-center text-center leading-snug shadow-[0_4px_16px_rgba(194,112,62,0.35)] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPending ? 'Отправка...' : <>Вызвать<br />официанта</>}
        </button>
      </div>

      {pendingRequests.length > 0 && (
        <div className="px-4 mt-2">
          <div className="text-sm text-[#888] mb-2">Активные заявки</div>
          {pendingRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-[14px] p-4 shadow-card mb-3"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[15px] font-semibold">
                    Заявка отправлена
                  </div>
                  <div className="text-[13px] text-[#888] mt-1">
                    {new Date(req.createdAt).toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[13px] font-semibold text-terra">
                  <span className="w-2 h-2 rounded-full bg-terra animate-pulse" />
                  Ожидание
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
