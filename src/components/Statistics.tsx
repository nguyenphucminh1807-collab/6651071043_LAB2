import type { JobStats } from '../stats'

export default function Statistics({ stats }: { stats: JobStats }) {
  const cards = [
    { label: 'Tổng số việc làm', value: String(stats.total) },
    { label: 'Doanh nghiệp tuyển dụng', value: String(stats.companies) },
    { label: 'Ngành nghề', value: String(stats.industries) },
    { label: 'Lương trung bình', value: `${Math.round(stats.averageSalary * 10) / 10} triệu` },
  ]
  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="flex flex-col-reverse rounded-2xl border border-slate-200 border-l-4 border-l-brand bg-white p-4 shadow-sm">
          <dt className="mt-1 text-sm text-slate-600">{c.label}</dt>
          <dd className="text-2xl font-extrabold text-slate-900">{c.value}</dd>
        </div>
      ))}
    </dl>
  )
}
