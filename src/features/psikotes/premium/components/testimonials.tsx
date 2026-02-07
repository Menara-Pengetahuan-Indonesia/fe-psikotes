import { Quote, Star, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const TESTIMONIALS = [
  {
    name: 'Andi Pratama',
    role: 'HR Manager',
    quote:
      'Hasil tes sangat akurat dan laporannya mudah dipahami. Sangat membantu kami dalam proses rekrutmen kandidat management trainee.',
    rating: 5,
  },
  {
    name: 'Sarah Wijaya',
    role: 'Mahasiswa Psikologi',
    quote:
      'Tes MMPI-2 di sini jauh lebih terjangkau dibanding klinik offline, tapi kualitas laporannya sama profesionalnya. Recommended!',
    rating: 5,
  },
  {
    name: 'Budi Santoso',
    role: 'Professional',
    quote:
      'Berkat tes minat bakat karir, saya jadi yakin switch career ke bidang data analyst. Insight-nya benar-benar membuka mata.',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-24 md:py-36 relative overflow-hidden bg-emerald-950">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 shadow-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-emerald-100 uppercase">
              User Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Pengalaman <span className="text-amber-300">Terbaik</span> Mereka
          </h2>
          <p className="text-lg text-emerald-200/70 max-w-2xl mx-auto font-medium">
            Lebih dari 10.000+ pengguna telah menemukan potensi terbaik mereka bersama Bermoela.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testi) => (
            <div
              key={testi.name}
              className={cn(
                "group bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 relative transition-all duration-500",
                "hover:shadow-2xl hover:shadow-emerald-900/40 hover:-translate-y-2",
                "shadow-xl"
              )}
            >
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <Quote className="w-6 h-6 fill-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {Array.from({ length: testi.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-emerald-50 mb-10 leading-relaxed font-medium italic text-lg tracking-tight">
                &quot;{testi.quote}&quot;
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-black text-emerald-200 text-lg border border-white/10">
                  {testi.name[0]}
                </div>
                <div>
                  <p className="font-black text-white text-base leading-none mb-1">{testi.name}</p>
                  <p className="text-[10px] text-emerald-300/60 font-bold uppercase tracking-widest">{testi.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
