interface Props {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({ title, description, actionLabel, onAction }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <svg viewBox="0 0 64 64" className="mx-auto h-14 w-14" fill="none" role="img" aria-label="Biểu tượng không có kết quả">
        <circle cx="28" cy="28" r="16" stroke="#059669" strokeWidth="4" />
        <path d="M40 40l14 14" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
        <path d="M22 28h12" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">{description}</p>
      {actionLabel && onAction && (
        <button type="button" onClick={onAction} className="btn-primary mt-6">
          {actionLabel}
        </button>
      )}
    </div>
  )
}
