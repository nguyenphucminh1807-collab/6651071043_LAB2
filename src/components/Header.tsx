import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'

const NAV = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/#viec-lam', label: 'Tìm việc làm', end: false },
  { to: '/#thong-ke', label: 'Thống kê', end: false },
  { to: '/gioi-thieu', label: 'Giới thiệu', end: false },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-brand-light hover:text-brand-darker ${
      isActive ? 'text-brand-dark' : 'text-slate-700'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" onClick={close} aria-label="JobFinder – về trang chủ" className="rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <NavLink key={item.label} to={item.to} end={item.end} className={item.to.includes('#') ? () => linkClass({ isActive: false }) : linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/dang-nhap" className="btn-outline">Đăng nhập</Link>
          <Link to="/dang-ky" className="btn-primary">Đăng ký</Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-slate-800 hover:border-brand lg:hidden"
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 lg:hidden">
          <nav aria-label="Điều hướng di động" className="flex flex-col">
            {NAV.map((item) => (
              <Link key={item.label} to={item.to} onClick={close} className="rounded-lg px-3 py-3 text-base font-medium text-slate-800 hover:bg-brand-light">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link to="/dang-nhap" onClick={close} className="btn-outline">Đăng nhập</Link>
            <Link to="/dang-ky" onClick={close} className="btn-primary">Đăng ký</Link>
          </div>
        </div>
      )}
    </header>
  )
}
