export default function Loading({ label = 'Đang tải…' }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-16 text-sm text-slate-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-t-transparent" aria-hidden="true" />
      {label}
    </div>
  )
}
