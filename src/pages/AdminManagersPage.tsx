import { useNavigate } from 'react-router-dom'
import { useAdminManagers, useDeleteManager } from '@/features/admin'
import { confirm } from '@/shared/ui/ConfirmDialog'

export const AdminManagersPage = () => {
  const navigate = useNavigate()
  const { data: managers, isLoading } = useAdminManagers()
  const { mutate: deleteManager } = useDeleteManager()

  const handleDelete = async (id: string, name: string) => {
    if (await confirm('Удаление менеджера', `Удалить менеджера «${name}»?`)) {
      deleteManager(id)
    }
  }

  return (
    <>
      <div className="bg-white px-5 py-4 border-b border-muted-bg flex items-center justify-between">
        <div className="text-xl font-bold text-terra">
          Tip<span className="text-ink">Top</span>
        </div>
        <div className="text-[15px] font-semibold">Менеджеры заведений</div>
      </div>

      <div className="p-4">
        <button
          onClick={() => navigate('/admin/managers/new')}
          className="flex items-center justify-center gap-2 w-full py-3 border-2 border-terra rounded-xl bg-transparent text-terra text-[15px] font-semibold cursor-pointer mb-4 active:bg-terra/5"
        >
          + Добавить менеджера
        </button>

        {isLoading && <p className="text-muted text-center py-10">Загрузка...</p>}

        <div className="flex flex-col gap-3">
          {managers?.map((m) => (
            <div key={m.id} className="bg-white rounded-xl p-3.5 px-4 shadow-card flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-base font-semibold">{m.firstName} {m.lastName}</div>
                <div className="text-sm text-forest mt-0.5">{m.venueName ?? 'Без заведения'}</div>
                <div className="text-[13px] text-[#999] mt-0.5">{m.phone}</div>
              </div>
              <button
                onClick={() => handleDelete(m.id, `${m.firstName} ${m.lastName}`)}
                className="flex-shrink-0 w-9 h-9 border-none bg-danger/5 rounded-[10px] text-danger text-lg cursor-pointer flex items-center justify-center ml-3 active:bg-danger/15"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
