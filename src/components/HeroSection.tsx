import type { ReactNode } from 'react'
import type { JobStats } from '../stats'

interface Props {
  stats: JobStats
  search: ReactNode
}

function Illustration() {
  return (
    <svg viewBox="0 0 420 340" className="h-auto w-full" role="img" aria-label="Minh họa hồ sơ ứng viên đang được ghép với các tin tuyển dụng phù hợp">
      <rect x="20" y="30" width="250" height="280" rx="22" fill="#fff" stroke="#A7F3D0" strokeWidth="2" />
      <circle cx="70" cy="85" r="24" fill="#059669" />
      <rect x="108" y="70" width="120" height="12" rx="6" fill="#0F172A" opacity="0.85" />
      <rect x="108" y="92" width="80" height="10" rx="5" fill="#94A3B8" />
      <rect x="42" y="135" width="206" height="10" rx="5" fill="#E2E8F0" />
      <rect x="42" y="157" width="170" height="10" rx="5" fill="#E2E8F0" />
      <rect x="42" y="179" width="190" height="10" rx="5" fill="#E2E8F0" />
      <rect x="42" y="215" width="58" height="26" rx="13" fill="#D1FAE5" />
      <rect x="108" y="215" width="70" height="26" rx="13" fill="#D1FAE5" />
      <rect x="186" y="215" width="54" height="26" rx="13" fill="#D1FAE5" />
      <rect x="42" y="262" width="206" height="32" rx="10" fill="#047857" />
      <rect x="215" y="10" width="190" height="86" rx="18" fill="#fff" stroke="#059669" strokeWidth="2.5" />
      <rect x="235" y="30" width="100" height="10" rx="5" fill="#0F172A" opacity="0.8" />
      <rect x="235" y="50" width="70" height="9" rx="4.5" fill="#94A3B8" />
      <rect x="235" y="70" width="90" height="12" rx="6" fill="#059669" />
      <rect x="250" y="120" width="160" height="86" rx="18" fill="#fff" stroke="#A7F3D0" strokeWidth="2" />
      <rect x="270" y="140" width="95" height="10" rx="5" fill="#0F172A" opacity="0.8" />
      <rect x="270" y="160" width="60" height="9" rx="4.5" fill="#94A3B8" />
      <rect x="270" y="180" width="84" height="12" rx="6" fill="#34D399" />
      <rect x="230" y="230" width="175" height="86" rx="18" fill="#fff" stroke="#A7F3D0" strokeWidth="2" />
      <rect x="250" y="250" width="105" height="10" rx="5" fill="#0F172A" opacity="0.8" />
      <rect x="250" y="270" width="64" height="9" rx="4.5" fill="#94A3B8" />
      <rect x="250" y="290" width="88" height="12" rx="6" fill="#34D399" />
    </svg>
  )
}

export default function HeroSection({ stats, search }: Props) {
  const items = [
    { label: 'Việc làm đang tuyển', value: stats.total },
    { label: 'Doanh nghiệp', value: stats.companies },
    { label: 'Ngành nghề', value: stats.industries },
  ]
  return (
    <section aria-labelledby="hero-title" className="bg-gradient-to-b from-brand-light/70 to-canvas">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pt-16">
        <div>
          <h1 id="hero-title" className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Tìm công việc phù hợp – Kiến tạo tương lai của bạn
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700">
            Khám phá hàng ngàn cơ hội việc làm hấp dẫn từ các doanh nghiệp uy tín. Tìm kiếm công việc phù hợp với kỹ năng, kinh nghiệm và định hướng nghề nghiệp của bạn.
          </p>
          <div className="mt-8">{search}</div>
          <dl className="mt-8 grid grid-cols-3 gap-4 text-left">
            {items.map((it) => (
              <div key={it.label} className="flex flex-col-reverse">
                <dt className="text-xs text-slate-600 sm:text-sm">{it.label}</dt>
                <dd className="text-2xl font-extrabold text-brand-dark sm:text-3xl">{it.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-slate-600">Số liệu tính từ bộ dữ liệu minh họa của dự án.</p>
        </div>
        <div className="hidden lg:block">
          <Illustration />
        </div>
      </div>
    </section>
  )
}
