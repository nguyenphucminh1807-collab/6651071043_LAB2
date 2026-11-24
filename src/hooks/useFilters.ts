import { useContext } from 'react'
import { FiltersContext } from '../context/FiltersContext'
import type { FiltersContextValue } from '../context/FiltersContext'

export function useFilters(): FiltersContextValue {
  const ctx = useContext(FiltersContext)
  if (!ctx) throw new Error('useFilters phải được dùng bên trong <FiltersProvider>')
  return ctx
}
