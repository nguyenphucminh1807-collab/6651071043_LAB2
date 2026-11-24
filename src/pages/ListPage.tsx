import { lazy, Suspense, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import FilterPanel from '../components/FilterPanel'
import type { RangeFilters } from '../components/FilterPanel'
import HeroSection from '../components/HeroSection'
import JobCard from '../components/JobCard'
import LazyOnVisible from '../components/LazyOnVisible'
import Loading from '../components/Loading'
import SearchBar from '../components/SearchBar'
import { industries, jobs, locations } from '../data/jobs'
import { describeFilters, filterJobs } from '../filterJobs'
import { useFilters } from '../hooks/useFilters'
import { computeStats } from '../stats'

// Tách bundle biểu đồ để trang tải nhanh hơn (tốt cho điểm Performance)
const ChartSection = lazy(() => import('../components/ChartSection'))

const PAGE_SIZE = 12

export default function ListPage() {
  const { filters, setFilters, resetFilters } = useFilters()
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchKey, setSearchKey] = useState(0)

  const allStats = useMemo(() => computeStats(jobs), [])
  const results = useMemo(
    () => [...filterJobs(jobs, filters)].sort((a, b) => b.postedAt.localeCompare(a.postedAt) || a.id - b.id),
    [filters],
  )
  const active = describeFilters(filters)

  const handleSearchChange = (keyword: string, location: string) => {
    setFilters((prev) => ({ ...prev, keyword, location }))
    setVisible(PAGE_SIZE)
  }

  const handleSearchSubmit = (keyword: string, location: string) => {
    handleSearchChange(keyword, location)
    document.getElementById('viec-lam')?.scrollIntoView()
  }

  const handleApply = (values: RangeFilters) => {
    setFilters((prev) => ({ ...prev, ...values }))
    setVisible(PAGE_SIZE)
  }

  const handleClearRange = () => {
    setFilters((prev) => ({ ...prev, industry: '', salaryMin: null, salaryMax: null, dateFrom: '', dateTo: '' }))
    setVisible(PAGE_SIZE)
  }

  const handleResetAll = () => {
    resetFilters()
    setSearchKey((k) => k + 1)
    setVisible(PAGE_SIZE)
  }

  const handleRemoveChip = (patch: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...patch }))
    if ('keyword' in patch || 'location' in patch) setSearchKey((k) => k + 1)
    setVisible(PAGE_SIZE)
  }

  const panelKey = `${filters.industry}|${filters.salaryMin}|${filters.salaryMax}|${filters.dateFrom}|${filters.dateTo}`

  return (
    <>
      <HeroSection
        stats={allStats}
        search={
          <SearchBar
            key={searchKey}
            initialKeyword={filters.keyword}
            initialLocation={filters.location}
            locations={locations}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />
        }
      />

      <section id="viec-lam" aria-labelledby="jobs-title" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="jobs-title" className="text-2xl font-bold text-slate-900">Việc làm mới nhất</h2>
            <p className="mt-1 text-sm text-slate-600" role="status" aria-live="polite">
              Tìm thấy <strong className="text-slate-900">{results.length}</strong> / {jobs.length} việc làm
            </p>
          </div>
          <button
            type="button"
            className="btn-outline sm:hidden"
            aria-expanded={filterOpen}
            aria-controls="filter-area"
            onClick={() => setFilterOpen((v) => !v)}
          >
            {filterOpen ? 'Ẩn bộ lọc' : 'Hiện bộ lọc lương & ngày'}
          </button>
        </div>

        <div id="filter-area" className={`mt-5 ${filterOpen ? 'block' : 'hidden'} sm:block`}>
          <FilterPanel key={panelKey} applied={filters} industries={industries} onApply={handleApply} onClear={handleClearRange} />
          <p className="mt-2 text-xs text-slate-600">Bộ lọc lương hiển thị các việc có khoảng lương giao với khoảng bạn chọn.</p>
        </div>

        {active.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2" aria-label="Bộ lọc đang áp dụng">
            <span className="text-sm font-medium text-slate-800">Đang lọc:</span>
            {active.map((a) => (
              <span key={a.id} className="inline-flex items-center gap-1 rounded-full bg-brand-light py-1 pl-3 pr-1 text-sm font-medium text-brand-darker">
                {a.label}
                <button
                  type="button"
                  aria-label={`Gỡ bộ lọc: ${a.label}`}
                  onClick={() => handleRemoveChip(a.patch)}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </span>
            ))}
            <button type="button" onClick={handleResetAll} className="text-sm font-semibold text-brand-dark underline underline-offset-2 hover:text-brand-darker">
              Xóa tất cả
            </button>
          </div>
        )}

        <div className="mt-6">
          {results.length === 0 ? (
            <EmptyState
              title="Chưa có việc làm phù hợp"
              description="Thử mở rộng khoảng lương, chọn khoảng ngày dài hơn hoặc đổi từ khóa tìm kiếm."
              actionLabel="Xóa tất cả bộ lọc"
              onAction={handleResetAll}
            />
          ) : (
            <>
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.slice(0, visible).map((job) => (
                  <li key={job.id}>
                    <JobCard job={job} />
                  </li>
                ))}
              </ul>
              {visible < results.length && (
                <div className="mt-8 text-center">
                  <button type="button" className="btn-outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    Xem thêm ({results.length - visible} việc làm)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section id="thong-ke" aria-labelledby="stats-title" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-4 pt-4 sm:px-6">
        <h2 id="stats-title" className="text-2xl font-bold text-slate-900">Thống kê thị trường việc làm</h2>
        <p className="mb-5 mt-1 text-sm text-slate-600">Tính toán trực tiếp từ {jobs.length} tin tuyển dụng trong bộ dữ liệu minh họa.</p>
        <LazyOnVisible>
          <Suspense fallback={<Loading label="Đang tải biểu đồ…" />}>
            <ChartSection />
          </Suspense>
        </LazyOnVisible>
      </section>
    </>
  )
}
