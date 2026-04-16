import { useNavigate } from 'react-router-dom'
import { useManagerWaiters, useDeleteWaiter } from '@/features/manager'
import { confirm } from '@/shared/ui/ConfirmDialog'

export const ManagerWaitersPage = () => {
  const navigate = useNavigate()
  const { data: waiters, isLoading } = useManagerWaiters()
  const { mutate: deleteWaiter } = useDeleteWaiter()

  const handleDelete = async (id: string, name: string) => {
    if (await confirm('Удаление официанта', `Удалить официанта «${name}»?`)) {
      deleteWaiter(id)
    }
  }

  return (
    <>
      <div className="bg-white px-4 py-5 pb-3 border-b border-muted-bg">
        <h1 className="text-[22px] font-bold">Официанты</h1>
      </div>

      <button
        onClick={() => navigate('/manager/waiters/new')}
        className="flex items-center justify-center gap-1.5 mx-4 mt-4 py-2.5 px-4 border-[1.5px] border-terra rounded-[10px] bg-transparent text-terra text-[15px] font-semibold cursor-pointer w-[calc(100%-32px)]"
      >
        + Добавить официанта
      </button>

      <div className="px-4 pt-4 flex flex-col gap-2.5">
        {isLoading && <p className="text-muted text-center py-10">Загрузка...</p>}
        {waiters?.map((w: any) => (
          <div key={w.id} className="bg-white rounded-xl p-3.5 px-4 shadow-card flex items-center justify-between">
            <div className="flex-1">
              <div className="text-[15px] font-semibold">{w.firstName} {w.lastName}</div>
              <div className="text-[13px] text-[#888] mt-0.5">{w.phone}</div>
              <div className="flex gap-3 mt-1.5">
                <span className="text-[12px] text-muted">
                  Столов сегодня: <span className="font-semibold text-ink">{w.tablesServedToday ?? 0}</span>
                </span>
                <span className="text-[12px] text-muted">
                  Чаевые: <span className="font-semibold text-forest">{(w.tipsToday ?? 0).toLocaleString('ru-RU')} ₽</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => handleDelete(w.id, `${w.firstName} ${w.lastName}`)}
              className="bg-transparent border-none cursor-pointer text-danger text-lg ml-3"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
