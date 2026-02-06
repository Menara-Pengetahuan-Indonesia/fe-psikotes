import { Video, Monitor, Users, ArrowRight, Grid, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const TRAINING_PROGRAMS = [
  {
    icon: Video,
    title: 'Program Webinar',
    description:
      'Ikuti webinar live interaktif bersama para ahli psikologi dan pengembangan diri setiap minggu dengan topik yang relevan dan praktis.',
    schedule: 'Setiap Minggu',
    price: 'Mulai Rp 99.000',
    theme: 'orange'
  },
  {
    icon: Monitor,
    title: 'Kelas Online',
    description:
      'Akses kelas online terstruktur yang bisa diikuti kapan saja dan di mana saja. Materi kurikulum dirancang secara sistematis untuk hasil maksimal.',
    schedule: 'Akses Seumur Hidup',
    price: 'Mulai Rp 199.000',
    theme: 'emerald'
  },
  {
    icon: Users,
    title: 'Mentoring Eksklusif',
    description:
      'Sesi mentoring one-on-one dengan mentor berpengalaman untuk mendapatkan bimbingan personal sesuai tujuan pengembangan diri Anda.',
    schedule: 'Fleksibel',
    price: 'Mulai Rp 499.000',
    theme: 'indigo'
  },
]

export function PelatihanPrograms() {
  return (
    <section id="programs" className="py-24 md:py-36 bg-[#fefce8] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-stone-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
             <Grid className="w-3 h-3 text-orange-600" />
             Featured Programs
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">Program Tersedia</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Pilih program yang paling sesuai dengan gaya belajar dan tujuan pengembangan diri Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAINING_PROGRAMS.map((program, idx) => {
            const Icon = program.icon
            
            const themes = {
              orange: 'border-orange-100 hover:border-orange-500 hover:shadow-orange-900/5 bg-orange-50/30',
              emerald: 'border-emerald-100 hover:border-emerald-500 hover:shadow-emerald-900/5 bg-emerald-50/30',
              indigo: 'border-indigo-100 hover:border-indigo-500 hover:shadow-indigo-900/5 bg-indigo-50/30'
            }

            const themeClasses = themes[program.theme as keyof typeof themes]

            return (
              <div
                key={program.title}
                className={cn(
                  "group relative flex flex-col p-10 rounded-[2.5rem] border bg-white transition-all duration-500 hover:-translate-y-2",
                  "shadow-xl shadow-stone-200/50 hover:shadow-2xl",
                  themeClasses
                )}
              >
                <div className="flex justify-between items-start mb-8">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-8 h-8 text-slate-900" />
                   </div>
                   <div className="px-3 py-1 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-full flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-orange-500 fill-orange-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Limited</span>
                   </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{program.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium flex-grow mb-10">{program.description}</p>

                <div className="space-y-4 pt-8 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Jadwal</span>
                    <span className="text-sm font-bold text-slate-600">{program.schedule}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Harga</span>
                    <span className="text-lg font-black text-slate-900">{program.price}</span>
                  </div>
                </div>

                <button className="mt-8 w-full py-4 bg-slate-950 text-white rounded-2xl text-xs font-black uppercase tracking-widest group-hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-950/10 hover:shadow-orange-200">
                  Daftar Sekarang <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}