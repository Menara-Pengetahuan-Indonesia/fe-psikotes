import type { Metadata } from 'next'
import { Building2, Phone, CheckCircle2 } from 'lucide-react'
import { CORPORATE_PRODUCTS } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Bisnis & Perusahaan — Bermoela',
  description: 'Assessment organisasi profesional: rekrutmen, promosi jabatan, leadership, cultural fit, dan audit organisasi 7S McKinsey.',
}

export default function BisnisPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <section className="bg-linear-to-b from-slate-900 to-slate-800 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
            <Building2 className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Bisnis & Perusahaan</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
            Investasi Terbaik <span className="text-amber-300 italic">adalah Manusianya</span>
          </h1>
          <p className="text-slate-300/70 font-medium max-w-2xl mx-auto text-base md:text-lg">
            Assessment psikologi organisasi berbasis data — dari rekrutmen staf hingga audit kesiapan AI, semua dalam satu platform.
          </p>

          {/* 2-tier pricing badge */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black text-white uppercase tracking-widest">Mandatory</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black text-white uppercase tracking-widest">Comprehensive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORPORATE_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-soft hover:shadow-xl transition-shadow duration-300 flex flex-col p-6 gap-5 group"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 text-amber-600">
                    <product.icon className="w-6 h-6" />
                  </div>
                  {product.callForDetail && (
                    <span className="px-2 py-1 rounded-full bg-amber-50 text-[10px] font-black text-amber-700 uppercase tracking-widest border border-amber-100">
                      Hubungi Kami
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div className="flex-1 space-y-2">
                  <h3 className="font-black text-base text-slate-900 leading-tight group-hover:text-amber-700 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Pricing Tiers */}
                <div className="grid grid-cols-2 gap-2">
                  {product.pricing.map((p) => (
                    <div
                      key={p.tier}
                      className="flex flex-col gap-0.5 p-3 rounded-2xl border border-slate-100 bg-slate-50"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {p.label}
                      </span>
                      <span className="text-xs font-medium text-slate-500 leading-tight">
                        {p.description}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {product.callForDetail ? (
                  <a
                    href={`/bisnis/${product.slug}`}
                    className="w-full h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-amber-700 transition-colors shadow-lg shadow-amber-100"
                  >
                    Lihat Detail
                  </a>
                ) : (
                  <a
                    href={`/bisnis/${product.slug}`}
                    className="w-full h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                  >
                    Lihat Detail
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 p-8 md:p-12 rounded-[3rem] bg-slate-900 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">
                  Butuh <span className="text-amber-300 italic">Assessment Khusus?</span>
                </h3>
                <p className="text-slate-300 font-medium text-sm md:text-base max-w-xl">
                  Kami menyediakan Customized Competency Based Assessment yang dirancang khusus sesuai kebutuhan industri dan kompetensi unik perusahaanmu.
                </p>
              </div>
              <a
                href="/contact"
                className="px-8 h-16 rounded-2xl bg-amber-500 text-white text-sm font-black uppercase tracking-widest shadow-xl hover:bg-amber-600 transition-colors flex items-center gap-3 shrink-0"
              >
                <Phone className="w-5 h-5" /> Konsultasi Gratis
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
