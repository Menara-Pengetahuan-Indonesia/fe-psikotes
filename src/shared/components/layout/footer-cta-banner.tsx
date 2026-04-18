import Link from 'next/link'
import { ArrowRight, Sparkles, Bot } from 'lucide-react'

type FooterCtaBannerProps = {
  cta: {
    title: string
    desc: string
    href: string
    label: string
  }
  theme: {
    textMuted: string
    ctaButton: string
  }
}

export function FooterCtaBanner({ cta }: FooterCtaBannerProps) {
  return (
    <div className="rounded-2xl md:rounded-3xl overflow-hidden mb-10 relative bg-[#0d3d2e]">

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }} />

      <div className="flex flex-col lg:flex-row items-center gap-8 px-8 md:px-12 py-10 md:py-12 relative z-10">

        {/* Left: AI Counsellor block */}
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
            <Bot className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span className="text-[10px] font-black text-emerald-300 uppercase tracking-[0.2em]">AI Counsellor · Gratis</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
            Masih Bingung Menentukan <span className="text-amber-400 italic">Titik Mula?</span>
          </h3>
          <p className="text-sm text-emerald-100/60 leading-relaxed max-w-md mx-auto lg:mx-0">
            Ceritakan situasimu ke AI Counsellor kami — gratis, tanpa daftar, dan langsung dapat rekomendasi produk yang paling sesuai.
          </p>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-24 bg-white/10 shrink-0" />

        {/* Right: CTA block */}
        <div className="flex flex-col items-center lg:items-end gap-4 shrink-0 text-center lg:text-right">
          <div className="space-y-1">
            <div className="flex items-center justify-center lg:justify-end gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <p className="text-[11px] font-black text-amber-300 uppercase tracking-widest">Siap Mengenali Potensimu?</p>
            </div>
            <p className="text-sm text-white/60">Mulai perjalanan pengembangan dirimu sekarang</p>
          </div>
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-amber-400 text-gray-900 font-black text-sm hover:bg-amber-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d3d2e]"
          >
            {cta.label}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <div className="flex items-center gap-3">
            {['Gratis', 'Tanpa Daftar', 'Privasi Terjaga'].map((t, i) => (
              <span key={t} className="flex items-center gap-1.5 text-[10px] font-semibold text-white/30">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-white/20" />}
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
