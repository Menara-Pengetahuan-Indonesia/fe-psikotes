import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Layers,
  Plus,
  Hexagon,
  Diamond,
  BookOpen,
  Building2,
  HeartPulse,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TOPO_WHITE, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'

export const metadata: Metadata = {
  title: 'Kategori — BERMOELA',
  description: 'Pilih kategori tes psikotes sesuai kebutuhanmu.',
}

const categories = [
  {
    title: 'Mahasiswa & Pelajar',
    tag: 'Student',
    desc: 'Tes minat bakat, jurusan, CPNS, dan try-out untuk membantu merencanakan masa depan akademik dan kariermu.',
    href: '/mahasiswa',
    icon: BookOpen,
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-600',
    iconHover: 'group-hover:bg-primary-600',
    border: 'hover:border-primary-500',
    shadow: 'hover:shadow-primary-900/10',
    titleHover: 'group-hover:text-primary-700',
    glow: 'bg-primary-400',
    aura: 'bg-primary-50',
    borderColor: 'border-primary-100',
  },
  {
    title: 'Perusahaan',
    tag: 'Corporate',
    desc: 'Asesmen rekrutmen, kenaikan jabatan, dan perencanaan karir untuk mendukung keputusan SDM yang lebih tepat.',
    href: '/bisnis',
    icon: Building2,
    iconBg: 'bg-accent-50',
    iconColor: 'text-accent-600',
    iconHover: 'group-hover:bg-accent-600',
    border: 'hover:border-accent-500',
    shadow: 'hover:shadow-accent-900/10',
    titleHover: 'group-hover:text-accent-700',
    glow: 'bg-accent-400',
    aura: 'bg-accent-50',
    borderColor: 'border-accent-100',
  },
  {
    title: 'Kesehatan Mental',
    tag: 'Mental Health',
    desc: 'Deteksi dini kondisi kesehatan jiwa melalui tes kepribadian, mental health screening, dan relationship assessment.',
    href: '/kesehatan-mental',
    icon: HeartPulse,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    iconHover: 'group-hover:bg-rose-600',
    border: 'hover:border-rose-500',
    shadow: 'hover:shadow-rose-900/10',
    titleHover: 'group-hover:text-rose-700',
    glow: 'bg-rose-400',
    aura: 'bg-rose-50',
    borderColor: 'border-rose-100',
  },
]

export default function KategoriPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden text-white bg-linear-to-b from-primary-800 via-primary-700 to-primary-500 pt-28 pb-14 md:pt-36 md:pb-20">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: TOPO_WHITE, backgroundSize: TOPO_BG_SIZE }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-primary-900/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-primary-300/20 rounded-full blur-[80px] pointer-events-none" />

        <Plus className="absolute top-[15%] left-[10%] text-primary-300/30 w-8 h-8" />
        <Hexagon className="absolute top-[40%] right-[10%] text-white/5 w-24 h-24 -rotate-12" />
        <Diamond className="absolute bottom-[10%] left-[20%] text-accent-400/20 w-16 h-16 rotate-12" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-700/50 border border-primary-400/30 shadow-lg backdrop-blur-md mb-8 mx-auto">
            <Layers className="w-3.5 h-3.5 text-accent-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-primary-50 uppercase">
              Kategori Tes
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6 drop-shadow-2xl">
            Pilih Kategori<br />
            <span className="text-accent-300">Sesuai Kebutuhanmu</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-50/80 max-w-2xl mx-auto font-medium leading-relaxed mb-4">
            Setiap kategori dirancang untuk menjawab kebutuhan yang berbeda.
          </p>
          <p className="text-base md:text-lg text-primary-50/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Temukan tes yang paling relevan dengan tujuan dan kondisimu saat ini.
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-14 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-primary-600 font-black text-[10px] uppercase tracking-[0.3em]">
                <Layers className="w-3 h-3" />
                Categories
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Semua{' '}
                <span className="text-primary-600 relative">
                  Kategori
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-300/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
              </h2>
              <p className="text-slate-500 font-medium text-sm max-w-md">
                Pilih kategori untuk melihat daftar tes yang tersedia.
              </p>
            </div>
            <div className="h-px bg-slate-200 grow hidden md:block mx-8 mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, index) => {
              const badge = String(index + 1).padStart(2, '0')
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={cn(
                    'group relative flex flex-col p-1 transition-all duration-500 overflow-hidden',
                    'bg-white border border-slate-200 hover:shadow-2xl hover:-translate-y-1.5',
                    'rounded-[2.5rem] shadow-sm',
                    cat.border, cat.shadow
                  )}
                >
                  <div className={cn('absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500', cat.aura)} />

                  <div className="relative z-10 flex-1 flex flex-col px-6 pt-7 pb-0">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-3xl font-black text-slate-900">{badge}</span>
                        <span className="px-3 py-1 bg-stone-50 text-[9px] font-black uppercase tracking-wider text-stone-400 rounded-full border border-stone-100">
                          {cat.tag}
                        </span>
                      </div>
                      <div className="relative">
                        <div className={cn('absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500', cat.glow)} />
                        <div className={cn(
                          'relative w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 shadow-inner',
                          cat.iconBg, cat.iconColor, cat.iconHover,
                          'group-hover:text-white group-hover:border-transparent',
                          cat.borderColor
                        )}>
                          <cat.icon className="w-7 h-7 stroke-2" />
                        </div>
                      </div>
                    </div>

                    <h3 className={cn('text-xl font-black text-stone-800 mb-3 leading-tight transition-colors', cat.titleHover)}>
                      {cat.title}
                    </h3>
                    <p className="text-sm font-medium text-stone-500 leading-relaxed line-clamp-3 mb-6">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="relative z-10 px-6 pt-4 pb-7">
                    <div className="w-full py-3.5 bg-primary-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary-200 flex items-center justify-center gap-2 transition-all group-hover:bg-primary-700">
                      Lihat Tes
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
