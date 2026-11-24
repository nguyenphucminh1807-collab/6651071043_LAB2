import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { validateEmail } from '../utils'

export default function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const isRegister = mode === 'register'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({})
  const [done, setDone] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: { name?: string; email?: string; password?: string } = {}
    if (isRegister && name.trim().length < 2) next.name = 'Vui lòng nhập họ tên.'
    if (!validateEmail(email)) next.email = 'Email chưa hợp lệ.'
    if (password.length < 6) next.password = 'Mật khẩu cần ít nhất 6 ký tự.'
    setErrors(next)
    setDone(Object.keys(next).length === 0)
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-extrabold text-slate-900">{isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}</h1>
        <p className="mt-1 text-sm text-slate-600">Bản demo: dữ liệu không được gửi đi đâu và không lưu lại.</p>

        {done ? (
          <p role="status" className="mt-6 rounded-xl bg-brand-light p-4 font-medium text-brand-darker">
            {isRegister ? 'Đăng ký thành công (demo).' : 'Đăng nhập thành công (demo).'}
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            {isRegister && (
              <div>
                <label htmlFor="auth-name" className="label">Họ và tên</label>
                <input id="auth-name" className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name"
                  aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'auth-name-err' : undefined} />
                {errors.name && <p id="auth-name-err" role="alert" className="mt-1 text-sm font-medium text-red-700">{errors.name}</p>}
              </div>
            )}
            <div>
              <label htmlFor="auth-email" className="label">Email</label>
              <input id="auth-email" type="email" className="field" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
                aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'auth-email-err' : undefined} />
              {errors.email && <p id="auth-email-err" role="alert" className="mt-1 text-sm font-medium text-red-700">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="auth-pass" className="label">Mật khẩu</label>
              <input id="auth-pass" type="password" className="field" value={password} onChange={(e) => setPassword(e.target.value)}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                aria-invalid={errors.password ? true : undefined} aria-describedby={errors.password ? 'auth-pass-err' : undefined} />
              {errors.password && <p id="auth-pass-err" role="alert" className="mt-1 text-sm font-medium text-red-700">{errors.password}</p>}
            </div>
            <button type="submit" className="btn-primary w-full">{isRegister ? 'Đăng ký' : 'Đăng nhập'}</button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-600">
          {isRegister ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
          <Link to={isRegister ? '/dang-nhap' : '/dang-ky'} className="font-semibold text-brand-dark underline underline-offset-2">
            {isRegister ? 'Đăng nhập' : 'Đăng ký'}
          </Link>
        </p>
      </div>
    </div>
  )
}
