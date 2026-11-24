import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { JobFilters } from '../types/job'

export interface FiltersContextValue {
  filters: JobFilters
  setFilters: Dispatch<SetStateAction<JobFilters>>
  resetFilters: () => void
}

export const FiltersContext = createContext<FiltersContextValue | null>(null)
