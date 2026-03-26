import { Sparkles, Award, Brain } from 'lucide-react'

interface ResultHeroSectionProps {
  subtitle: string
}

export function ResultHeroSection({
  subtitle,
}: ResultHeroSectionProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white pt-8 pb-10 md:pt-10 md:pb-12">
      <div className="max-w-2xl mx-auto px-6 relative z-10 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest">
          <Sparkles className="size-3 text-teal-300 fill-teal-300" />
          Hasil Tes Kamu
        </div>
        <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
          Selamat! Profil kamu
          <br /> telah teridentifikasi.
        </h1>
        <p className="text-slate-400 font-medium text-lg">
          {subtitle}
        </p>
      </div>

      <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
        <Award className="size-[400px]" />
      </div>
    </header>
  )
}
