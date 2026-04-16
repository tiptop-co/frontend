import { useManagerTables, useCreateTable, useDeleteTable } from '@/features/manager'
import { confirm } from '@/shared/ui/ConfirmDialog'

export const ManagerTablesPage = () => {
  const { data: tables, isLoading } = useManagerTables()
  const { mutate: createTable } = useCreateTable()
  const { mutate: deleteTable } = useDeleteTable()

  return (
    <>
      <div className="bg-white px-4 py-5 pb-3 border-b border-muted-bg">
        <h1 className="text-[22px] font-bold">Столы и QR-коды</h1>
      </div>

      <button
        onClick={() => createTable()}
        className="flex items-center justify-center gap-1.5 mx-4 mt-4 py-2.5 px-4 border-[1.5px] border-terra rounded-[10px] bg-transparent text-terra text-[15px] font-semibold cursor-pointer w-[calc(100%-32px)]"
      >
        + Добавить стол
      </button>

      <div className="px-4 pt-4 flex flex-col gap-2.5">
        {isLoading && <p className="text-muted text-center py-10">Загрузка...</p>}
        {tables?.map((table) => {
          const isOpen = table.status !== 'free'
          return (
            <div key={table.id} className="bg-white rounded-xl p-3.5 px-4 shadow-card flex items-center gap-3">
              <div className="text-base font-bold min-w-[60px]">Стол {table.number}</div>
              <span className={`text-[11px] px-2.5 py-[3px] rounded-[10px] font-semibold ${
                isOpen ? 'bg-terra/10 text-terra' : 'bg-muted-bg text-[#999]'
              }`}>
                {isOpen ? 'Открыт' : 'Закрыт'}
              </span>
              <span className="flex-1" />
              <div className="flex flex-col items-end gap-1">
                <button
                  onClick={async () => {
                    if (await confirm('Удаление стола', `Удалить стол ${table.number}?`)) deleteTable(table.id)
                  }}
                  disabled={isOpen}
                  className="bg-transparent border-none cursor-pointer text-danger text-xs font-semibold disabled:text-[#ccc] disabled:cursor-default"
                >
                  Удалить
                </button>
                {isOpen && (
                  <span className="text-[11px] text-[#999]">Есть активные заказы</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
