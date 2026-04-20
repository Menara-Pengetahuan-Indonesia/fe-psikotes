import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Sparkles, ArrowRight } from 'lucide-react'
import { RelationshipProductGrid } from '@/features/psikotes/components'
import { RELATIONSHIP_PRODUCTS } from '@/features/psikotes/constants'

export const metadata: Metadata = {
  title: 'Relationship — Bermoela',
  description: 'Assessment untuk red flag pasangan, konflik rumah tangga, kesepian dalam pernikahan, dan kehidupan single.',
}

export default function RelationshipPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative bg-linear-to-b from-primary-950 via-primary-900 to-primary-800 pt-32 pb-24 overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4))] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
            <Heart className="w-4 h-4 text-accent-300 fill-accent-300" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Relationship</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]">
            Hubungan yang <br className="hidden md:block" />
            <span className="text-accent-300 italic">Lebih Sehat</span>
          </h1>

          <p className="text-primary-100/80 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Dari red flag pasangan baru hingga kesepian dalam pernikahan — asesmen berbasis psikologi untuk memahami pola relasi dan membangun hubungan yang benar-benar bermakna.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 pt-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-white tracking-tight">10</span>
              <span className="text-[10px] font-black text-primary-200 uppercase tracking-widest mt-1">Assessment</span>
            </div>
            <div className="w-px h-10 bg-white/15 hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-white tracking-tight">19k+</span>
              <span className="text-[10px] font-black text-primary-200 uppercase tracking-widest mt-1">Pasangan</span>
            </div>
            <div className="w-px h-10 bg-white/15 hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-white tracking-tight">3</span>
              <span className="text-[10px] font-black text-primary-200 uppercase tracking-widest mt-1">Level Kedalaman</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="max-w-2xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100">
              <Sparkles className="w-3 h-3 text-primary-600 fill-primary-600" />
              <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest">
                {RELATIONSHIP_PRODUCTS.length} Assessment Tersedia
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Setiap Hubungan Punya <span className="text-primary-600 italic">Ceritanya Sendiri</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
              Pilih asesmen yang paling sesuai dengan situasimu. Setiap tes tersedia dalam 3 level kedalaman — dari yang cepat sampai yang paling komprehensif.
            </p>
          </div>

          <RelationshipProductGrid />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative p-8 md:p-12 rounded-[3rem] bg-primary-600 shadow-2xl shadow-primary-900/20 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 text-accent-300 fill-accent-300" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Bingung Mulai?</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">
                  Ceritakan Situasimu, <span className="text-accent-300 italic">Kami Bantu</span>
                </h3>
                <p className="text-primary-50 font-medium text-sm md:text-base">
                  AI Counsellor kami siap dengar cerita kamu dan rekomendasikan asesmen yang paling pas — gratis, tanpa daftar.
                </p>
              </div>
              <Link
                href="/"
                className="px-8 h-16 rounded-2xl bg-white text-primary-600 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-colors flex items-center gap-3 shrink-0"
              >
                Konsultasi Gratis
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
