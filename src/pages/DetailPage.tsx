import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import CompanyLogo from '../components/CompanyLogo'
import { jobs } from '../data/jobs'
import { formatCurrency, formatDate, validateEmail } from '../utils'

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700 marker:text-brand">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </section>
  )
}

export default function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const job = jobs.find((j) => String(j.id) === id)

  const [applying, setApplying] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [sent, setSent] = useState(false)

  if (!job) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Không tìm thấy công việc</h1>
        <p className="mt-3 text-slate-600">Tin tuyển dụng có mã “{id}” không tồn tại hoặc đã bị gỡ.</p>
        <Link to="/#viec-lam" className="btn-primary mt-6">Quay lại danh sách việc làm</Link>
      </div>
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: { name?: string; email?: string } = {}
    if (name.trim().length < 2) next.name = 'Vui lòng nhập họ tên (ít nhất 2 ký tự).'
    if (!validateEmail(email)) next.email = 'Email chưa hợp lệ, ví dụ: ten@example.com.'
    setErrors(next)
    if (!next.name && !next.email) setSent(true)
  }

  const info: [string, string][] = [
    ['Địa điểm', job.location],
    ['Hình thức', job.employmentType],
    ['Kinh nghiệm', job.experience],
    ['Ngày đăng', formatDate(job.postedAt)],
    ['Hạn ứng tuyển', formatDate(job.deadline)],
    ['Ngành nghề', job.industry],
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link to="/#viec-lam" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-dark hover:text-brand-darker">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" />
        </svg>
        Quay lại danh sách
      </Link>

      <article className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <CompanyLogo text={job.logoText} id={job.id} size="lg" />
            <div>
              <h1 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">{job.title}</h1>
              <p className="mt-1 text-slate-700">{job.company}</p>
              <p className="mt-2 text-lg font-bold text-brand-dark">
                {formatCurrency(job.salaryMin, job.currency)} – {formatCurrency(job.salaryMax, job.currency)}
              </p>
            </div>
          </div>
          <button type="button" className="btn-primary sm:shrink-0" aria-expanded={applying} aria-controls="apply-form" onClick={() => setApplying(true)}>
            Ứng tuyển ngay
          </button>
        </header>

        <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 rounded-xl bg-canvas p-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {info.map(([k, v]) => (
            <div key={k}>
              <dt className="text-slate-600">{k}</dt>
              <dd className="font-semibold text-slate-900">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">Mô tả công việc</h2>
          <p className="mt-3 leading-relaxed text-slate-700">{job.description}</p>
        </section>
        <Section title="Yêu cầu ứng viên" items={job.requirements} />
        <Section title="Quyền lợi" items={job.benefits} />

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">Kỹ năng cần thiết</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {job.skills.map((s) => (
              <li key={s} className="rounded-full bg-brand-light px-3 py-1 text-sm font-medium text-brand-darker">{s}</li>
            ))}
          </ul>
        </section>

        {applying && (
          <section id="apply-form" aria-labelledby="apply-title" className="mt-10 rounded-2xl border border-brand bg-brand-light/40 p-5 sm:p-6">
            <h2 id="apply-title" className="text-lg font-semibold text-slate-900">Ứng tuyển vị trí {job.title}</h2>
            {sent ? (
              <p role="status" className="mt-3 font-medium text-brand-darker">
                Đã ghi nhận hồ sơ của {name.trim()} (bản demo, chưa gửi tới nhà tuyển dụng thật). Cảm ơn bạn!
              </p>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="apply-name" className="label">Họ và tên</label>
                  <input id="apply-name" className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name"
                    aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'apply-name-err' : undefined} />
                  {errors.name && <p id="apply-name-err" role="alert" className="mt-1 text-sm font-medium text-red-700">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="apply-email" className="label">Email</label>
                  <input id="apply-email" type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
                    aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'apply-email-err' : undefined} />
                  {errors.email && <p id="apply-email-err" role="alert" className="mt-1 text-sm font-medium text-red-700">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn-primary">Gửi hồ sơ</button>
                </div>
              </form>
            )}
          </section>
        )}
      </article>
    </div>
  )
}
