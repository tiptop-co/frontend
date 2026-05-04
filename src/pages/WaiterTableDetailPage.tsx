import { useNavigate, useParams } from 'react-router-dom'
import { useWaiterTableDetail, useCloseTable } from '@/features/waiter'
import { Badge } from '@/shared/ui'
import type { OrderItem } from '@/shared/types'

export const WaiterTableDetailPage = () => {
  const { tableId } = useParams<{ tableId: string }>()
  const navigate = useNavigate()
  const { data, isLoading } = useWaiterTableDetail(tableId!)
  const { mutate: closeTable, isPending: isClosing } = useCloseTable()

  if (isLoading || !data) {
    return <p className="text-muted text-center py-20">Загрузка...</p>
  }

  const { table, order, requests } = data
  const unpaidAmount = order
    ? order.totalAmount - order.paidAmount
    : 0
  const allPaid = order ? unpaidAmount === 0 : false

  return (
    <>
      <div className="sticky top-0 z-10 bg-cream px-5 pt-4 pb-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/waiter')}
          className="text-2xl text-ink bg-transparent border-none cursor-pointer"
        >
          &larr;
        </button>
        <h1 className="text-[22px] font-bold">Стол {table.number}</h1>
        <Badge label="Открыт" variant="active" />
      </div>

      {order && (
        <div className="px-5 mb-6">
          <div className="text-[17px] font-bold mb-3">Заказ</div>
          <div className="bg-white rounded-[14px] p-4 px-[18px] shadow-card">
            <div className="flex justify-between items-center mb-3">
              <div>
                <span className="text-[15px] font-semibold">Заказ</span>
                <span className="text-[13px] text-muted ml-2">
                  открыт в{' '}
                  {new Date(order.createdAt).toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <Badge label="В процессе" variant="active" />
            </div>

            <div className="border-t border-muted-bg pt-2.5">
              {order.items.map((item) => (
                <ItemRow key={item.id} item={item} />
              ))}
            </div>

            {order.wishes && (
              <div className="mt-3 p-3 bg-cream rounded-xl text-sm text-[#666] leading-relaxed">
                <span className="text-muted text-xs font-semibold block mb-1">Пожелания</span>
                {order.wishes}
              </div>
            )}

            <div className="flex justify-between text-[15px] font-bold border-t border-muted-bg pt-2.5 mt-2">
              <span>Итого</span>
              <span>{order.totalAmount.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex justify-between text-[13px] text-muted mt-1.5">
              <span>
                Оплачено: {order.paidAmount.toLocaleString('ru-RU')} ₽
              </span>
              <span>
                Не оплачено: {unpaidAmount.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        </div>
      )}

      {!allPaid && unpaidAmount > 0 && (
        <div className="flex items-center justify-center gap-2 bg-danger-light border border-danger-border text-danger rounded-[10px] py-3 px-4 mx-5 mb-5 text-sm font-semibold">
          ⚠ Есть неоплаченные позиции — {unpaidAmount.toLocaleString('ru-RU')} ₽
        </div>
      )}

      {allPaid && order && (
        <div className="flex items-center justify-center gap-2 bg-forest-light border border-forest text-forest rounded-[10px] py-3 px-4 mx-5 mb-5 text-sm font-semibold">
          ✓ Все позиции оплачены
        </div>
      )}

      {requests.length > 0 && (
        <div className="px-5 mb-6">
          <div className="text-[17px] font-bold mb-3">Заявки</div>
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-[14px] p-4 px-[18px] shadow-card mb-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0 animate-pulse" />
                <div className="flex-1">
                  <div className="text-[15px] font-semibold">
                    Вызов официанта
                  </div>
                  <div className="text-[13px] text-muted">
                    {new Date(req.createdAt).toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    · Ожидание
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="px-5 mb-6">
        <button
          onClick={() =>
            closeTable(tableId!, {
              onSuccess: () => navigate('/waiter'),
            })
          }
          disabled={!allPaid || isClosing}
          className="w-full py-3.5 border-2 border-danger rounded-xl bg-transparent text-danger text-base font-semibold cursor-pointer active:bg-danger active:text-white disabled:border-[#D5D0C8] disabled:text-[#D5D0C8] disabled:cursor-not-allowed"
        >
          {isClosing ? 'Закрываем…' : 'Закрыть стол'}
        </button>
        {!allPaid && (
          <p className="text-xs text-muted text-center mt-2">
            Стол можно закрыть, когда все позиции оплачены
          </p>
        )}
      </div>
    </>
  )
}

const ItemRow = ({ item }: { item: OrderItem }) => {
  const isPaid = item.status === 'paid'
  return (
    <div
      className={`flex justify-between items-center text-sm py-1.5 rounded-md ${
        isPaid ? '' : 'bg-danger-light -mx-2 px-2 my-0.5'
      }`}
    >
      <span className={isPaid ? 'text-forest' : 'text-danger'}>
        {isPaid && <span className="text-xs mr-1">✓</span>}
        {item.dishName} × {item.quantity}
      </span>
      <span
        className={`whitespace-nowrap ${isPaid ? 'text-forest' : 'text-danger'}`}
      >
        {item.price.toLocaleString('ru-RU')} ₽
      </span>
    </div>
  )
}
