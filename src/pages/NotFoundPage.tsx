import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-5xl font-extrabold text-brand-dark">404</p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">Không tìm thấy trang</h1>
      <p className="mt-3 text-slate-600">Đường dẫn bạn truy cập không tồn tại hoặc đã được di chuyển.</p>
      <Link to="/" className="btn-primary mt-6">Về trang chủ</Link>
    </div>
  )
}
