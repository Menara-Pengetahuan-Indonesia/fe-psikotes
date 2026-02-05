import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

const HERO_BENEFITS = [
  { label: 'Analisis Mendalam', desc: 'Tes berbasis riset psikologi profesional' },
  { label: 'Rekomendasi Personal', desc: 'Langkah praktis sesuai hasil tesmu' },
  { label: 'Akses Mudah', desc: 'Online, kapan saja dan di mana saja' },
  { label: 'Laporan Detail', desc: 'Insight lengkap yang mudah dipahami' },
]

export function PsikotesHero() {
  return (
    <section className="relative overflow-hidden bg-[#fefce8] py-20 md:py-32">
      
      {/* --- CLEAN BACKGROUND (No Batik) --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-b from-white/80 via-transparent to-white/40 pointer-events-none" />

      {/* --- FLOATING 3D ORNAMENTS --- */}
      <div className="absolute top-20 right-[-10%] w-150 h-150 bg-[radial-gradient(circle_at_30%_30%,#d1fae5_0%,#34d399_100%)] opacity-30 rounded-full blur-[80px] animate-float-slow mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-125 h-125 bg-[radial-gradient(circle_at_30%_30%,#ffedd5_0%,#fb923c_100%)] opacity-20 rounded-full blur-[80px] animate-float-medium mix-blend-multiply pointer-events-none" />


      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-stone-500 uppercase">
                Platform Psikotes Terpercaya
              </span>
            </div>
            
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-stone-800 tracking-tighter leading-[1.1] drop-shadow-sm">
                Kenali Dirimu,<br />
                <span className="text-emerald-600 drop-shadow-[0_2px_0_rgba(16,185,129,0.2)]">Potensimu</span> Menanti.
              </h1>
              <p className="text-lg text-stone-600 max-w-lg leading-relaxed font-medium">
                Buka wawasan baru tentang kepribadian dan bakatmu dengan metode asesmen yang ilmiah, akurat, dan mudah diakses.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {HERO_BENEFITS.map((b) => (
                <div key={b.label} className="flex items-start gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-emerald-100 hover:border-emerald-300 hover:bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="bg-emerald-100 p-2 rounded-xl shrink-0 text-emerald-700">
                    <Check className="h-5 w-5 stroke-3" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-800 text-sm mb-1">{b.label}</p>
                    <p className="text-stone-500 text-xs leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Area */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-[0_6px_0_#047857] hover:shadow-[0_3px_0_#047857] hover:translate-y-0.75 transition-all border-none">
                <Link href="/psikotes/premium">
                  Mulai Tes Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="flex flex-col items-center sm:items-start px-4">
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Mulai Dari</span>
                <span className="text-2xl font-black text-amber-500">Rp25.000</span>
              </div>
            </div>
          </div>

          {/* Right Illustration (3D Composition) */}
          <div className="hidden lg:block relative perspective-1000">
            <div className="relative w-full aspect-square max-w-125 mx-auto transform-style-3d animate-float-slow">
              
              {/* Main Card */}
              <div className="absolute inset-4 bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-stone-100 flex items-center justify-center overflow-hidden z-20">
                 {/* Internal Decor */}
                 <div className="absolute top-0 left-0 w-full h-32 bg-emerald-50 rounded-b-[50%] scale-150 -translate-y-16" />
                 
                 <div className="text-center space-y-4 p-8 relative z-10">
                    <div className="w-24 h-24 bg-emerald-100 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-inner mb-4">
                        🧩
                    </div>
                    <h3 className="text-2xl font-black text-stone-800">Analisis 360°</h3>
                    <p className="text-stone-500 text-sm">Laporan komprehensif mencakup kepribadian, minat, dan bakat.</p>
                    
                    <div className="flex justify-center gap-2 mt-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <div className="w-2 h-2 rounded-full bg-stone-200" />
                        <div className="w-2 h-2 rounded-full bg-stone-200" />
                    </div>
                 </div>
              </div>

              {/* Floating Elements Behind/Around */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-100 rounded-3xl rotate-12 z-10 animate-float-fast shadow-xl border border-white" />
              <div className="absolute -bottom-8 -left-4 w-32 h-32 bg-indigo-100 rounded-full z-30 animate-float-medium shadow-xl border-4 border-white flex items-center justify-center">
                  <span className="text-3xl">✨</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
