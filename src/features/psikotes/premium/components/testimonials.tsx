import { Quote, Star } from 'lucide-react'

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
    <section className="py-24 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Kata Mereka</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Pengalaman Pengguna</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testi) => (
            <div
              key={testi.name}
              className="bg-slate-800/50 p-8 rounded-3xl border border-white/5 relative hover:bg-slate-800 transition-colors"
            >
              <Quote className="w-10 h-10 text-slate-700 absolute top-8 right-8" />

              {/* Stars */}
              <div className="flex gap-1 mb-6 text-white">
                {Array.from({ length: testi.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-slate-300 mb-8 leading-relaxed">&quot;{testi.quote}&quot;</p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">
                  {testi.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm">{testi.name}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{testi.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
