import raw from './data.json'
import type { Job } from '../types/job'

export const jobs: Job[] = raw

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'vi'))
}

export const industries: string[] = uniqueSorted(jobs.map((j) => j.industry))
export const locations: string[] = uniqueSorted(jobs.map((j) => j.location))
