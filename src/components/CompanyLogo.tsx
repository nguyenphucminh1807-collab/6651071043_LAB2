const COLORS = ['#047857', '#0F766E', '#1E293B', '#334155', '#065F46', '#115E59']

export default function CompanyLogo({ text, id, size = 'md' }: { text: string; id: number; size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'h-16 w-16 text-xl' : 'h-12 w-12 text-base'
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-xl font-bold text-white ${dim}`}
      style={{ backgroundColor: COLORS[id % COLORS.length] }}
    >
      {text}
    </span>
  )
}
