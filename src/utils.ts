/** Định dạng số tiền theo chuẩn Việt Nam, mặc định VND. Ví dụ: 150000 → "150.000 ₫" */
export function formatCurrency(amount: number, currency: string = 'VND'): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'VND' ? 0 : 2,
  }).format(amount)
}

/** Cắt chuỗi dài hơn maxLength và nối thêm "..." */
export function truncateText(text: string, maxLength: number): string {
  if (!Number.isFinite(maxLength) || maxLength < 0) return text
  const limit = Math.floor(maxLength)
  if (text.length <= limit) return text
  return `${text.slice(0, limit)}...`
}

/** Kiểm tra email hợp lệ: có phần tên, @, và tên miền có dấu chấm */
export function validateEmail(email: string): boolean {
  const value = email.trim()
  if (value.length === 0 || value.length > 254) return false
  return /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(value)
}

/** Gom nhiều lần gọi liên tiếp thành một lần sau khoảng `delay` ms */
export function debounce<T extends (...args: never[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout> | undefined
  const debounced = (...args: Parameters<T>): void => {
    if (timer !== undefined) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
      fn(...args)
    }, delay)
  }
  return debounced as unknown as T
}

/** "15–25 triệu" từ số tiền VND */
export function formatSalaryRange(min: number, max: number): string {
  const toMillion = (v: number): string => String(Math.round((v / 1_000_000) * 10) / 10).replace('.', ',')
  return `${toMillion(min)} – ${toMillion(max)} triệu`
}

/** "2026-11-23" → "23/11/2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}/${m}/${y}`
}
