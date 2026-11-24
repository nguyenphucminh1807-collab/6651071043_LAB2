import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
            JobFinder giúp bạn tìm việc làm phù hợp với kỹ năng, kinh nghiệm và định hướng nghề nghiệp.
          </p>
        </div>
        <nav aria-label="Liên kết nhanh">
          <h2 className="text-sm font-semibold text-slate-900">Khám phá</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/#viec-lam" className="text-slate-600 hover:text-brand-dark">Tìm việc làm</Link></li>
            <li><Link to="/#thong-ke" className="text-slate-600 hover:text-brand-dark">Thống kê tuyển dụng</Link></li>
            <li><Link to="/gioi-thieu" className="text-slate-600 hover:text-brand-dark">Giới thiệu</Link></li>
          </ul>
        </nav>
        <nav aria-label="Chính sách">
          <h2 className="text-sm font-semibold text-slate-900">Chính sách</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/gioi-thieu#chinh-sach" className="text-slate-600 hover:text-brand-dark">Chính sách bảo mật</Link></li>
            <li><Link to="/gioi-thieu#dieu-khoan" className="text-slate-600 hover:text-brand-dark">Điều khoản sử dụng</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Liên hệ (minh họa)</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Email: hotro@jobfinder.example</li>
            <li>Điện thoại: 028 0000 0000</li>
            <li>TP. Hồ Chí Minh, Việt Nam</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs text-slate-600">
        © 2026 JobFinder – Bài thực hành Thiết kế Web (MSSV 6651071043). Dữ liệu tuyển dụng chỉ mang tính minh họa.
      </div>
    </footer>
  )
}
