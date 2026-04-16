import { useManagerStats } from '@/features/manager'

export const ManagerStatsPage = () => {
  const { data: stats, isLoading } = useManagerStats()

  if (isLoading || !stats) {
    return <p className="text-muted text-center py-20">Загрузка...</p>
  }

  const maxDaily = Math.max(...stats.dailyRevenue.map((d) => d.amount))

  return (
    <>
      <div className="bg-white px-4 py-5 pb-3 border-b border-muted-bg">
        <h1 className="text-[22px] font-bold">Статистика</h1>
        <div className="text-[13px] text-[#888] mt-0.5">Апрель 2026</div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-4">
        <StatCard label="Выручка" value={`${stats.revenue.toLocaleString('ru-RU')} ₽`} />
        <StatCard label="Заказов" value={String(stats.ordersCount)} />
        <StatCard label="Средний чек" value={`${stats.averageCheck.toLocaleString('ru-RU')} ₽`} />
        <StatCard label="Чаевые" value={`${stats.tipsTotal.toLocaleString('ru-RU')} ₽`} />
      </div>

      <div className="px-4 pb-5">
        <div className="text-base font-bold mb-3">По дням</div>
        <div className="flex items-end gap-2 h-[120px] px-1">
          {stats.dailyRevenue.map((d) => {
            const pct = maxDaily > 0 ? (d.amount / maxDaily) * 100 : 0
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[9px] text-[#666] font-semibold">
                  {Math.round(d.amount / 1000)}k
                </span>
                <div
                  className="w-full rounded-t-md bg-terra min-h-[4px]"
                  style={{ height: `${pct}%` }}
                />
                <span className="text-[10px] text-[#888]">{d.day}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="px-4 pb-5">
        <div className="text-base font-bold mb-3">Популярные блюда</div>
        <div className="flex flex-col gap-2.5">
          {stats.topDishes.map((dish, i) => (
            <div key={dish.name} className="bg-white rounded-[10px] p-3 px-3.5 shadow-card flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold text-terra min-w-[20px]">{i + 1}</span>
                <span className="text-sm font-medium">{dish.name}</span>
              </div>
              <span className="text-[13px] text-[#888]">{dish.count} заказов</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white rounded-xl p-3.5 px-4 shadow-card">
    <div className="text-xs text-[#888]">{label}</div>
    <div className="text-[22px] font-bold mt-1">{value}</div>
  </div>
)
