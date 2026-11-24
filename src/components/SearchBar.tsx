import { useState } from 'react'
import type { FormEvent } from 'react'
import { useDebouncedCallback } from '../hooks/useDebouncedCallback'

interface Props {
  initialKeyword: string
  initialLocation: string
  locations: string[]
  /** Gọi khi gõ (debounce 300ms) hoặc đổi địa điểm */
  onChange: (keyword: string, location: string) => void
  /** Gọi khi bấm nút Tìm kiếm / nhấn Enter */
  onSubmit: (keyword: string, location: string) => void
}

export default function SearchBar({ initialKeyword, initialLocation, locations, onChange, onSubmit }: Props) {
  const [keyword, setKeyword] = useState(initialKeyword)
  const [location, setLocation] = useState(initialLocation)
  const debouncedChange = useDebouncedCallback(onChange, 300)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(keyword, location)
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Tìm kiếm việc làm"
      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label htmlFor="search-keyword" className="label">Vị trí hoặc công ty</label>
        <input
          id="search-keyword"
          type="search"
          className="field"
          placeholder="Vị trí, kỹ năng, công ty…"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value)
            debouncedChange(e.target.value, location)
          }}
        />
      </div>
      <div className="sm:w-52">
        <label htmlFor="search-location" className="label">Địa điểm</label>
        <select
          id="search-location"
          className="field"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value)
            onChange(keyword, e.target.value)
          }}
        >
          <option value="">Tất cả địa điểm</option>
          {locations.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-primary h-[42px] sm:px-8">Tìm kiếm</button>
    </form>
  )
}
