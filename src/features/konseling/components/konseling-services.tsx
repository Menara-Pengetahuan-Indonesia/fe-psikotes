import { Users, Heart, MessageSquare, ArrowRight, Grid } from 'lucide-react'
import { cn } from '@/lib/utils'

const KONSELING_SERVICES = [
  {
    icon: Users,
    title: 'Konseling Individu',
    description:
      'Sesi konseling pribadi dengan psikolog profesional untuk menghadapi tantangan personal, karir, atau kesehatan mental Anda secara mendalam.',
    price: 'Mulai Rp 250.000',
    duration: '60 Menit / Sesi',
    theme: 'indigo'
  },
  {
    icon: Heart,
    title: 'Konseling Pasangan',
    description:
      'Bantu memperkuat hubungan Anda dan pasangan melalui sesi konseling yang dipandu oleh ahli hubungan berpengalaman.',
    price: 'Mulai Rp 350.000',
    duration: '90 Menit / Sesi',
    theme: 'rose'
  },
  {
    icon: MessageSquare,
    title: 'Konseling Kelompok',
    description:
      'Sesi konseling berkelompok yang dipandu profesional untuk berbagi pengalaman dan mendapat dukungan dari sesama dalam lingkungan yang aman.',
    price: 'Mulai Rp 150.000',
    duration: '90 Menit / Sesi',
    theme: 'sky'
  },
]

export function KonselingServices() {
  return (
    <section id="services" className="py-24 md:py-36 bg-[#faf5e4] relative overflow-hidden">
      {/* Ornaments */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-stone-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
             <Grid className="w-3 h-3 text-indigo-600" />
             Specialized Sessions
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">Layanan Konseling</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Pilih jenis konseling yang paling sesuai dengan kebutuhan Anda saat ini.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {KONSELING_SERVICES.map((service, idx) => {
            const Icon = service.icon
            
            const themes = {
              indigo: 'border-indigo-100 hover:border-indigo-500 hover:shadow-indigo-900/5 bg-indigo-50/30',
              rose: 'border-rose-100 hover:border-rose-500 hover:shadow-rose-900/5 bg-rose-50/30',
              sky: 'border-sky-100 hover:border-sky-500 hover:shadow-sky-900/5 bg-sky-50/30'
            }

            const themeClasses = themes[service.theme as keyof typeof themes]

            return (
              <div
                key={service.title}
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
                   <div className="px-3 py-1 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-full">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Professional</span>
                   </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium flex-grow mb-10">{service.description}</p>

                <div className="space-y-4 pt-8 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Investasi</span>
                    <span className="text-lg font-black text-slate-900">{service.price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Waktu</span>
                    <span className="text-sm font-bold text-slate-600">{service.duration}</span>
                  </div>
                </div>

                <button className="mt-8 w-full py-4 bg-slate-950 text-white rounded-2xl text-xs font-black uppercase tracking-widest group-hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-950/10 hover:shadow-indigo-200">
                  Mulai Konseling <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}