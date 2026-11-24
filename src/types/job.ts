export interface Job {
  id: number
  title: string
  company: string
  logoText: string
  industry: string
  location: string
  salaryMin: number
  salaryMax: number
  currency: string
  postedAt: string
  deadline: string
  employmentType: string
  experience: string
  description: string
  requirements: string[]
  benefits: string[]
  skills: string[]
}

export interface JobFilters {
  keyword: string
  location: string
  industry: string
  /** Lương tối thiểu, đơn vị: triệu đồng. null = không giới hạn */
  salaryMin: number | null
  /** Lương tối đa, đơn vị: triệu đồng. null = không giới hạn */
  salaryMax: number | null
  /** Ngày đăng từ (yyyy-mm-dd), rỗng = không giới hạn */
  dateFrom: string
  /** Ngày đăng đến (yyyy-mm-dd), rỗng = không giới hạn */
  dateTo: string
}

export interface CountItem {
  name: string
  value: number
}
