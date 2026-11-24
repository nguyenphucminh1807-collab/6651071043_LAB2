import type { CountItem, Job } from './types/job'

export interface JobStats {
  total: number
  companies: number
  industries: number
  locations: number
  averageSalary: number
  byIndustry: CountItem[]
  byLocation: CountItem[]
  salaryBuckets: CountItem[]
}

function countBy(items: readonly Job[], pick: (job: Job) => string): CountItem[] {
  const map = new Map<string, number>()
  for (const job of items) {
    const key = pick(job)
    map.set(key, (map.get(key) ?? 0) + 1)
  }
  return Array.from(map, ([name, value]) => ({ name, value })).sort(
    (a, b) => b.value - a.value || a.name.localeCompare(b.name, 'vi'),
  )
}

const BUCKETS: { name: string; min: number; max: number }[] = [
  { name: 'Dưới 10 triệu', min: 0, max: 10 },
  { name: '10–15 triệu', min: 10, max: 15 },
  { name: '15–20 triệu', min: 15, max: 20 },
  { name: '20–30 triệu', min: 20, max: 30 },
  { name: 'Từ 30 triệu', min: 30, max: Infinity },
]

/** Tính toàn bộ số liệu thống kê trực tiếp từ danh sách việc làm */
export function computeStats(jobs: readonly Job[]): JobStats {
  const mid = (j: Job): number => (j.salaryMin + j.salaryMax) / 2 / 1_000_000
  const total = jobs.length
  const averageSalary = total === 0 ? 0 : jobs.reduce((sum, j) => sum + mid(j), 0) / total
  return {
    total,
    companies: new Set(jobs.map((j) => j.company)).size,
    industries: new Set(jobs.map((j) => j.industry)).size,
    locations: new Set(jobs.map((j) => j.location)).size,
    averageSalary,
    byIndustry: countBy(jobs, (j) => j.industry),
    byLocation: countBy(jobs, (j) => j.location),
    salaryBuckets: BUCKETS.map((b) => ({
      name: b.name,
      value: jobs.filter((j) => mid(j) >= b.min && mid(j) < b.max).length,
    })),
  }
}
