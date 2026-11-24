import { Link } from 'react-router-dom'
import type { Job } from '../types/job'
import { formatDate, formatSalaryRange } from '../utils'
import CompanyLogo from './CompanyLogo'

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:border-brand hover:shadow-md">
      <div className="flex items-start gap-3">
        <CompanyLogo text={job.logoText} id={job.id} />
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-snug text-slate-900">{job.title}</h3>
          <p className="mt-0.5 truncate text-sm text-slate-600">{job.company}</p>
        </div>
      </div>

      <p className="mt-4 text-base font-bold text-brand-dark">{formatSalaryRange(job.salaryMin, job.salaryMax)}</p>

      <dl className="mt-3 grid grid-cols-1 gap-1.5 text-sm text-slate-700">
        <div className="flex gap-2"><dt className="w-24 shrink-0 text-slate-500">Địa điểm</dt><dd>{job.location}</dd></div>
        <div className="flex gap-2"><dt className="w-24 shrink-0 text-slate-500">Hình thức</dt><dd>{job.employmentType}</dd></div>
        <div className="flex gap-2"><dt className="w-24 shrink-0 text-slate-500">Kinh nghiệm</dt><dd>{job.experience}</dd></div>
      </dl>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-light px-2.5 py-1 text-xs font-semibold text-brand-darker">{job.industry}</span>
        <span className="text-xs text-slate-500">Đăng {formatDate(job.postedAt)}</span>
      </div>

      <Link to={`/item/${job.id}`} className="btn-outline mt-5 w-full">
        Xem chi tiết<span className="sr-only">: {job.title}</span>
      </Link>
    </article>
  )
}
