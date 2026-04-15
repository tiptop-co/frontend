import { useAdminStats } from '@/features/admin'

export const AdminStatsPage = () => {
  const { data: stats, isLoading } = useAdminStats()

  if (isLoading || !stats) {
    return <p className="text-muted text-center py-20">Загрузка...</p>
  }

  return (
    <>
      <div className="bg-white px-5 py-4 border-b border-muted-bg flex items-center justify-between">
        <div className="text-xl font-bold text-terra">
          Tip<span className="text-ink">Top</span>
        </div>
        <div className="text-right">
          <div className="text-[15px] font-semibold">Статистика по заведениям</div>
          <div className="text-[13px] text-[#999] mt-0.5">Апрель 2026</div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-5">
          <StatCard label="Заведений" value={String(stats.venuesCount)} />
          <StatCard label="Общая выручка" value={`${stats.totalRevenue.toLocaleString('ru-RU')} ₽`} accent />
          <StatCard label="Всего заказов" value={stats.totalOrders.toLocaleString('ru-RU')} />
          <StatCard label="Средний чек" value={`${stats.averageCheck.toLocaleString('ru-RU')} ₽`} />
        </div>

        <div className="text-base font-bold mb-3">По заведениям</div>

        <div className="flex flex-col gap-3">
          {stats.venues.map((venue) => (
            <div key={venue.name} className="bg-white rounded-xl p-3.5 px-4 shadow-card">
              <div className="text-base font-semibold mb-2">{venue.name}</div>
              <div className="flex gap-2">
                <Metric label="Выручка" value={`${venue.revenue.toLocaleString('ru-RU')} ₽`} />
                <Metric label="Заказов" value={String(venue.orders)} />
                <Metric label="Ср. чек" value={`${venue.averageCheck.toLocaleString('ru-RU')} ₽`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const StatCard = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="bg-white rounded-xl p-3.5 px-4 shadow-card">
    <div className="text-[13px] text-[#999] mb-1">{label}</div>
    <div className={`text-[22px] font-bold ${accent ? 'text-terra' : ''}`}>{value}</div>
  </div>
)

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="flex-1 bg-cream rounded-lg py-2 px-2.5 text-center">
    <div className="text-[11px] text-[#999] mb-0.5">{label}</div>
    <div className="text-sm font-bold">{value}</div>
  </div>
)
