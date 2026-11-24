import type { Job, JobFilters } from './types/job'
import { formatDate } from './utils'

export const EMPTY_FILTERS: JobFilters = {
  keyword: '',
  location: '',
  industry: '',
  salaryMin: null,
  salaryMax: null,
  dateFrom: '',
  dateTo: '',
}

const MILLION = 1_000_000

/** Bỏ dấu tiếng Việt, đưa về chữ thường để tìm kiếm không phân biệt dấu */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
}

/**
 * Lọc danh sách việc làm (không thay đổi mảng gốc).
 * - Lương: giữ việc có khoảng lương GIAO với khoảng người dùng chọn.
 * - Ngày: so sánh theo ngày đăng tuyển (yyyy-mm-dd), gồm cả hai đầu mút.
 */
export function filterJobs(source: readonly Job[], filters: JobFilters): Job[] {
  const keyword = normalizeText(filters.keyword)
  return source.filter((job) => {
    if (keyword) {
      const haystack = normalizeText(
        `${job.title} ${job.company} ${job.industry} ${job.skills.join(' ')}`,
      )
      if (!haystack.includes(keyword)) return false
    }
    if (filters.location && job.location !== filters.location) return false
    if (filters.industry && job.industry !== filters.industry) return false
    if (filters.salaryMin !== null && job.salaryMax < filters.salaryMin * MILLION) return false
    if (filters.salaryMax !== null && job.salaryMin > filters.salaryMax * MILLION) return false
    if (filters.dateFrom && job.postedAt < filters.dateFrom) return false
    if (filters.dateTo && job.postedAt > filters.dateTo) return false
    return true
  })
}

export interface ActiveFilter {
  id: string
  label: string
  /** Giá trị cần ghi đè để gỡ bộ lọc này */
  patch: Partial<JobFilters>
}

/** Mô tả các bộ lọc đang bật, dùng để hiển thị chip */
export function describeFilters(filters: JobFilters): ActiveFilter[] {
  const items: ActiveFilter[] = []
  if (filters.keyword.trim()) {
    items.push({ id: 'keyword', label: `Từ khóa: ${filters.keyword.trim()}`, patch: { keyword: '' } })
  }
  if (filters.location) {
    items.push({ id: 'location', label: `Địa điểm: ${filters.location}`, patch: { location: '' } })
  }
  if (filters.industry) {
    items.push({ id: 'industry', label: `Ngành: ${filters.industry}`, patch: { industry: '' } })
  }
  if (filters.salaryMin !== null || filters.salaryMax !== null) {
    const from = filters.salaryMin !== null ? `từ ${filters.salaryMin}` : ''
    const to = filters.salaryMax !== null ? `đến ${filters.salaryMax}` : ''
    items.push({
      id: 'salary',
      label: `Lương: ${[from, to].filter(Boolean).join(' ')} triệu`,
      patch: { salaryMin: null, salaryMax: null },
    })
  }
  if (filters.dateFrom || filters.dateTo) {
    const from = filters.dateFrom ? `từ ${formatDate(filters.dateFrom)}` : ''
    const to = filters.dateTo ? `đến ${formatDate(filters.dateTo)}` : ''
    items.push({
      id: 'date',
      label: `Ngày đăng: ${[from, to].filter(Boolean).join(' ')}`,
      patch: { dateFrom: '', dateTo: '' },
    })
  }
  return items
}
