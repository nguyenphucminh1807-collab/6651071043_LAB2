import { useState } from 'react'
import type { FormEvent } from 'react'
import type { JobFilters } from '../types/job'

export type RangeFilters = Pick<JobFilters, 'industry' | 'salaryMin' | 'salaryMax' | 'dateFrom' | 'dateTo'>

interface Props {
  applied: RangeFilters
  industries: string[]
  onApply: (values: RangeFilters) => void
  onClear: () => void
}

const PRESETS: { label: string; min: string; max: string }[] = [
  { label: 'Dưới 10 triệu', min: '', max: '10' },
  { label: '10 – 20 triệu', min: '10', max: '20' },
  { label: '20 – 30 triệu', min: '20', max: '30' },
  { label: 'Trên 30 triệu', min: '30', max: '' },
]

type Parsed = { ok: true; value: number | null } | { ok: false }

function parseSalary(text: string): Parsed {
  const t = text.trim()
  if (t === '') return { ok: true, value: null }
  const n = Number(t)
  if (!Number.isFinite(n) || n < 0) return { ok: false }
  return { ok: true, value: n }
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export default function FilterPanel({ applied, industries, onApply, onClear }: Props) {
  const [industry, setIndustry] = useState(applied.industry)
  const [minText, setMinText] = useState(applied.salaryMin === null ? '' : String(applied.salaryMin))
  const [maxText, setMaxText] = useState(applied.salaryMax === null ? '' : String(applied.salaryMax))
  const [dateFrom, setDateFrom] = useState(applied.dateFrom)
  const [dateTo, setDateTo] = useState(applied.dateTo)
  const [salaryError, setSalaryError] = useState('')
  const [dateError, setDateError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const min = parseSalary(minText)
    const max = parseSalary(maxText)
    let sErr = ''
    let dErr = ''

    if (!min.ok || !max.ok) sErr = 'Mức lương phải là số không âm (đơn vị: triệu đồng).'
    else if (min.value !== null && max.value !== null && min.value > max.value)
      sErr = 'Lương tối thiểu không được lớn hơn lương tối đa.'

    if ((dateFrom && !DATE_RE.test(dateFrom)) || (dateTo && !DATE_RE.test(dateTo))) dErr = 'Ngày không hợp lệ.'
    else if (dateFrom && dateTo && dateFrom > dateTo) dErr = 'Ngày bắt đầu không được sau ngày kết thúc.'

    setSalaryError(sErr)
    setDateError(dErr)
    if (sErr || dErr || !min.ok || !max.ok) return

    onApply({ industry, salaryMin: min.value, salaryMax: max.value, dateFrom, dateTo })
  }

  const handleClear = () => {
    setIndustry('')
    setMinText('')
    setMaxText('')
    setDateFrom('')
    setDateTo('')
    setSalaryError('')
    setDateError('')
    onClear()
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Bộ lọc việc làm" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="f-industry" className="label">Ngành nghề</label>
          <select id="f-industry" className="field" value={industry} onChange={(e) => setIndustry(e.target.value)}>
            <option value="">Tất cả ngành</option>
            {industries.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <fieldset className="min-w-0">
          <legend className="label">Khoảng lương (triệu đồng/tháng)</legend>
          <div className="flex items-center gap-2">
            <label htmlFor="f-min" className="sr-only">Lương tối thiểu</label>
            <input
              id="f-min" type="number" inputMode="decimal" min={0} step="any" placeholder="Từ" className="field"
              value={minText} onChange={(e) => setMinText(e.target.value)}
              aria-invalid={salaryError ? true : undefined} aria-describedby={salaryError ? 'salary-error' : undefined}
            />
            <span aria-hidden="true" className="text-slate-500">–</span>
            <label htmlFor="f-max" className="sr-only">Lương tối đa</label>
            <input
              id="f-max" type="number" inputMode="decimal" min={0} step="any" placeholder="Đến" className="field"
              value={maxText} onChange={(e) => setMaxText(e.target.value)}
              aria-invalid={salaryError ? true : undefined} aria-describedby={salaryError ? 'salary-error' : undefined}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((p) => {
              const active = minText === p.min && maxText === p.max
              return (
                <button
                  key={p.label} type="button" aria-pressed={active}
                  onClick={() => { setMinText(p.min); setMaxText(p.max) }}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    active ? 'border-brand-dark bg-brand-dark text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-brand'
                  }`}
                >
                  {p.label}
                </button>
              )
            })}
          </div>
          {salaryError && <p id="salary-error" role="alert" className="mt-2 text-sm font-medium text-red-700">{salaryError}</p>}
        </fieldset>

        <fieldset className="min-w-0 sm:col-span-2 lg:col-span-1">
          <legend className="label">Ngày đăng tuyển</legend>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="f-from" className="mb-1 block text-xs text-slate-600">Từ ngày</label>
              <input
                id="f-from" type="date" className="field" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                aria-invalid={dateError ? true : undefined} aria-describedby={dateError ? 'date-error' : undefined}
              />
            </div>
            <div>
              <label htmlFor="f-to" className="mb-1 block text-xs text-slate-600">Đến ngày</label>
              <input
                id="f-to" type="date" className="field" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                aria-invalid={dateError ? true : undefined} aria-describedby={dateError ? 'date-error' : undefined}
              />
            </div>
          </div>
          {dateError && <p id="date-error" role="alert" className="mt-2 text-sm font-medium text-red-700">{dateError}</p>}
        </fieldset>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={handleClear} className="btn-outline">Xóa bộ lọc</button>
        <button type="submit" className="btn-primary">Áp dụng bộ lọc</button>
      </div>
    </form>
  )
}
