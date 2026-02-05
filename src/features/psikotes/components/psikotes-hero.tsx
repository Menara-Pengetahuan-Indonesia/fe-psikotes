import { Button } from '@/components/ui/button'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const HERO_BENEFITS = [
  { label: 'Analisis Mendalam', desc: 'Tes berbasis riset psikologi profesional' },
  { label: 'Rekomendasi Personal', desc: 'Langkah praktis sesuai hasil tesmu' },
  { label: 'Akses Mudah', desc: 'Online, kapan saja dan di mana saja' },
  { label: 'Laporan Detail', desc: 'Insight lengkap yang mudah dipahami' },
]

export function PsikotesHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary-100 via-surface-100 to-primary-200 py-20 md:py-8">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-300/30 rounded-full blur-3xl pointer-events-none mix-blend-multiply" />
      <div className="absolute top-1/2 -left-24 w-72 h-72 bg-secondary-200/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 backdrop-blur-sm border border-primary-200 text-secondary-800 text-sm font-medium shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
              </span>
              Platform Psikotes Terpercaya
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-secondary-900">
              Kenali Dirimu,<br />
              <span className="text-primary-700">Temukan Potensi Terbaikmu</span>
            </h1>
            
            <p className="text-lg text-secondary-700 max-w-lg leading-relaxed">
              Buka wawasan baru tentang kepribadian dan bakatmu dengan metode asesmen yang ilmiah, akurat, dan mudah diakses.
            </p>

            <ul className="grid sm:grid-cols-2 gap-4">
              {HERO_BENEFITS.map((b) => (
                <li key={b.label} className="flex items-start gap-3 bg-white/30 backdrop-blur-md p-3 rounded-xl border border-primary-200/50 shadow-sm transition-transform hover:-translate-y-1">
                  <div className="bg-primary-600 p-1.5 rounded-full shrink-0 shadow-lg shadow-primary-600/20">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-secondary-900 text-sm">{b.label}</p>
                    <p className="text-secondary-600 text-xs leading-relaxed">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-secondary-900 hover:bg-secondary-800 text-white shadow-xl shadow-secondary-900/20 transition-all text-base px-8 h-12 rounded-full border border-secondary-800">
                <Link href="/psikotes/premium">
                  Mulai Tes Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="flex flex-col items-center sm:items-start p-3 rounded-lg bg-surface-200/50 border border-surface-300/50">
                <span className="text-xs text-secondary-600 font-bold uppercase tracking-wider">Mulai Dari</span>
                <span className="text-2xl font-black text-accent-600">Rp25.000</span>
              </div>
            </div>
          </div>

          {/* Abstract Illustration */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              {/* Main abstract shape */}
              <div className="absolute inset-4 bg-gradient-to-tr from-secondary-800 to-secondary-900 rounded-[2rem] shadow-2xl transform -rotate-3 transition-transform hover:rotate-0 duration-500"></div>
              <div className="absolute inset-4 bg-surface-100 rounded-[2rem] border border-primary-200 shadow-xl transform rotate-3 transition-transform hover:rotate-0 duration-500 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-100 via-transparent to-transparent opacity-50"></div>
                
                {/* Internal composition */}
                <div className="grid grid-cols-2 gap-4 p-8 w-full h-full opacity-90">
                  <div className="bg-primary-500 rounded-2xl h-full w-full animate-pulse delay-75 shadow-inner"></div>
                  <div className="space-y-4">
                    <div className="bg-secondary-200 rounded-2xl h-1/3 w-full"></div>
                    <div className="bg-accent-400 rounded-2xl h-2/3 w-full shadow-lg shadow-accent-400/20"></div>
                  </div>
                  <div className="bg-surface-400 rounded-2xl h-2/3 w-full col-span-2"></div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-secondary-900 p-4 rounded-2xl shadow-xl border border-secondary-700 animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-accent-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div>
                    <p className="text-xs text-secondary-300 font-bold">Akurasi</p>
                    <p className="text-sm font-black text-white">98%</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-surface-200 animate-bounce duration-[4000ms]">
                 <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">👥</span>
                  </div>
                  <div>
                    <p className="text-xs text-secondary-500 font-bold">Peserta</p>
                    <p className="text-sm font-black text-secondary-900">10.000+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
