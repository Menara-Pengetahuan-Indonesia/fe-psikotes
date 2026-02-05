import { CURRICULUM_LEVELS } from '../constants'

export function CurriculumPyramid() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-surface-200">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100 rounded-full blur-3xl -z-10" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-secondary-900">Kurikulum Pertumbuhan</h2>
          <p className="text-secondary-600">Lima tingkatan pengembangan diri dari fondasi hingga dampak sosial</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          {CURRICULUM_LEVELS.map((level) => (
            <div key={level.level} className={`${level.width} ${level.background} rounded-xl px-6 py-4 flex items-center justify-between transition-all hover:scale-105 hover:shadow-2xl`}>
              <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Level {level.level}</span>
              <span className="font-bold tracking-wide">{level.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
