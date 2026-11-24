import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { FiltersContext } from './FiltersContext'
import { EMPTY_FILTERS } from '../filterJobs'
import type { JobFilters } from '../types/job'

/** Giữ bộ lọc khi người dùng đi sang trang chi tiết rồi quay lại danh sách */
export default function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<JobFilters>(EMPTY_FILTERS)
  const resetFilters = useCallback(() => setFilters(EMPTY_FILTERS), [])
  const value = useMemo(() => ({ filters, setFilters, resetFilters }), [filters, resetFilters])
  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
}
