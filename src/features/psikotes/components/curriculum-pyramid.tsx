import { CURRICULUM_LEVELS } from '../constants'

export function CurriculumPyramid() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Kurikulum Pertumbuhan</h2>
          <p className="text-slate-500">Lima tingkatan pengembangan diri dari fondasi hingga dampak sosial</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          {CURRICULUM_LEVELS.map((level) => (
            <div key={level.level} className={`${level.width} ${level.background} rounded-xl px-6 py-3 flex items-center justify-between transition-all hover:scale-105`}>
              <span className="text-xs font-bold opacity-70">Level {level.level}</span>
              <span className="font-bold">{level.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
