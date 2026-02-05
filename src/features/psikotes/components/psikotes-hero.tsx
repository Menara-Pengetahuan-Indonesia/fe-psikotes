import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'

const HERO_BENEFITS = [
  { label: 'Analisis Mendalam', desc: 'Tes berbasis riset psikologi profesional' },
  { label: 'Rekomendasi Personal', desc: 'Langkah praktis sesuai hasil tesmu' },
  { label: 'Akses Mudah', desc: 'Online, kapan saja dan di mana saja' },
  { label: 'Laporan Detail', desc: 'Insight lengkap yang mudah dipahami' },
]

export function PsikotesHero() {
  return (
    <section className="bg-slate-900 text-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
              Kenali Dirimu,<br />
              <span className="text-slate-400">Temukan Potensi Terbaikmu</span>
            </h1>
            <ul className="space-y-4">
              {HERO_BENEFITS.map((b) => (
                <li key={b.label} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{b.label}</p>
                    <p className="text-slate-400 text-sm">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3">
              <p className="text-slate-400 text-sm">Mulai Dari</p>
              <p className="text-3xl font-black">Rp25.000</p>
            </div>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/psikotes/premium">Lihat Psikotes Premium</Link>
            </Button>
          </div>
          {/* Illustration placeholder */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-80 h-80 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <p className="text-slate-600 text-sm">Illustration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
