import { cn } from '@/lib/utils'

const STATS = [
  { value: '50K+', label: 'Pengguna Aktif' },
  { value: '200+', label: 'Tes Tersedia' },
  { value: '50+', label: 'Psikolog Berlisensi' },
  { value: '98%', label: 'Tingkat Kepuasan' },
] as const

export function AboutStatsSection() {
  return (
    <section className="bg-white pb-20 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-4',
            'gap-4 -mt-6',
          )}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className={cn(
                'bg-white rounded-3xl p-6',
                'text-center shadow-xl',
                'shadow-secondary/5 border',
                'border-slate-100',
              )}
            >
              <p
                className={cn(
                  'text-3xl md:text-4xl',
                  'font-black text-secondary',
                  'mb-1',
                )}
              >
                {s.value}
              </p>
              <p
                className={cn(
                  'text-xs md:text-sm',
                  'text-slate-500 font-medium',
                )}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
