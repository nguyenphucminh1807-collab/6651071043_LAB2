import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { jobs } from '../data/jobs'
import { computeStats } from '../stats'
import type { CountItem } from '../types/job'
import Statistics from './Statistics'

const BRAND = '#059669'
const AXIS = '#475569'
const PIE_COLORS = ['#059669', '#6EE7B7', '#065F46', '#34D399', '#0D9488', '#A7F3D0', '#047857', '#5EEAD4', '#0F766E', '#99F6E4']

function ChartCard({ id, title, summary, data, children }: { id: string; title: string; summary: string; data: CountItem[]; children: ReactNode }) {
  return (
    <figure aria-labelledby={`${id}-title`} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <figcaption>
        <h3 id={`${id}-title`} className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{summary}</p>
      </figcaption>
      <div className="mt-4 h-80 w-full min-w-0" role="img" aria-label={`${title}. ${summary} Xem bảng dữ liệu bên dưới để biết chi tiết.`}>
        {children}
      </div>
      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-medium text-brand-dark">Xem dữ liệu dạng bảng</summary>
        <table className="mt-2 w-full text-left">
          <caption className="sr-only">{title}</caption>
          <thead>
            <tr className="border-b border-slate-200 text-slate-600">
              <th scope="col" className="py-1.5 pr-2 font-medium">Nhóm</th>
              <th scope="col" className="py-1.5 text-right font-medium">Số việc làm</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.name} className="border-b border-slate-100">
                <th scope="row" className="py-1.5 pr-2 font-normal text-slate-800">{d.name}</th>
                <td className="py-1.5 text-right text-slate-800">{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  )
}

const tooltipFormatter = (value: unknown): [string, string] => [`${String(value)} việc làm`, 'Số lượng']

export default function ChartSection() {
  const stats = useMemo(() => computeStats(jobs), [])
  const topIndustry = stats.byIndustry[0]
  const topLocation = stats.byLocation[0]
  const topBucket = [...stats.salaryBuckets].sort((a, b) => b.value - a.value)[0]
  const percent = (n: number) => Math.round((n / stats.total) * 100)

  return (
    <div>
      <Statistics stats={stats} />
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard
          id="chart-industry"
          title="Số việc làm theo ngành nghề"
          summary={topIndustry ? `Ngành nhiều tin nhất: ${topIndustry.name} (${topIndustry.value}/${stats.total} tin).` : ''}
          data={stats.byIndustry}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.byIndustry} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fill: AXIS, fontSize: 12 }} />
              <YAxis type="category" dataKey="name" width={118} tick={{ fill: AXIS, fontSize: 11 }} />
              <Tooltip formatter={tooltipFormatter} cursor={{ fill: '#D1FAE5' }} />
              <Bar dataKey="value" name="Số việc làm" fill={BRAND} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          id="chart-share"
          title="Tỷ lệ việc làm theo nhóm ngành"
          summary={topIndustry ? `${topIndustry.name} chiếm ${percent(topIndustry.value)}% tổng số tin.` : ''}
          data={stats.byIndustry}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={stats.byIndustry} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2} cy="42%">
                {stats.byIndustry.map((d, i) => (
                  <Cell key={d.name} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="#fff" />
                ))}
              </Pie>
              <Tooltip formatter={tooltipFormatter} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: 11 }}
                formatter={(value: string) => <span style={{ color: AXIS }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          id="chart-salary"
          title="Phân bố mức lương (trung bình khoảng lương)"
          summary={topBucket ? `Mức phổ biến nhất: ${topBucket.name} (${topBucket.value} tin).` : ''}
          data={stats.salaryBuckets}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.salaryBuckets} margin={{ top: 8, right: 8, bottom: 4, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: AXIS, fontSize: 11 }} interval={0} />
              <YAxis allowDecimals={false} tick={{ fill: AXIS, fontSize: 12 }} />
              <Tooltip formatter={tooltipFormatter} cursor={{ fill: '#D1FAE5' }} />
              <Bar dataKey="value" name="Số việc làm" fill={BRAND} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          id="chart-location"
          title="Số việc làm theo địa điểm"
          summary={topLocation ? `${topLocation.name} dẫn đầu với ${topLocation.value} tin.` : ''}
          data={stats.byLocation}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.byLocation} margin={{ top: 8, right: 8, bottom: 4, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: AXIS, fontSize: 11 }} interval={0} angle={-25} textAnchor="end" height={60} />
              <YAxis allowDecimals={false} tick={{ fill: AXIS, fontSize: 12 }} />
              <Tooltip formatter={tooltipFormatter} cursor={{ fill: '#D1FAE5' }} />
              <Bar dataKey="value" name="Số việc làm" fill={BRAND} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
