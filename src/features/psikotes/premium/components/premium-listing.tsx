'use client'

import { useState, useMemo } from 'react'
import { Search, Star, Sparkles, Plus, Hexagon, Diamond, Grid, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

import { TestListingCard } from '@/features/psikotes/components'
import { PREMIUM_TESTS } from '@/features/psikotes/constants'

const FILTERS = ['Semua', 'Karir & Profesi', 'Klinis', 'Kepribadian', 'Edukasi']

export function PremiumListing() {
  const [activeFilter, setActiveFilter] = useState('Semua')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return PREMIUM_TESTS.filter((t) => {
      const matchesSearch =
        search === '' ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())

      if (activeFilter === 'Semua') return matchesSearch

      return matchesSearch && (t.subCategory === activeFilter || t.tag === activeFilter)
    })
  }, [search, activeFilter])

  const popular = filtered.slice(0, 4)
  const others = filtered.slice(4)

  return (
    <div className="bg-[#F8F7FF]">
      {/* ── Exclusive Hero (Matching Gratis Style) ───────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-linear-to-b from-purple-950 via-purple-900 to-purple-800 text-white pt-32 pb-20 md:pt-40 md:pb-32">
        
        {/* --- RICH BACKGROUND ORNAMENTS --- */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='white' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
               backgroundSize: '400px 400px'
             }}
        />
        
        <Plus className="absolute top-[15%] left-[10%] text-purple-400/20 w-8 h-8 animate-pulse" />
        <Hexagon className="absolute top-[40%] right-[10%] text-white/5 w-24 h-24 -rotate-12 animate-float-slow" />
        <Diamond className="absolute bottom-[10%] left-[20%] text-amber-400/20 w-16 h-16 rotate-12 animate-float-medium" />

        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-800/40 border border-purple-500/30 shadow-lg backdrop-blur-md mb-8 mx-auto">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-purple-50 uppercase">
              Premium Access
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6 drop-shadow-2xl">
            Investasi Terbaik <br />
            <span className="text-amber-300">Untuk Dirimu</span>
          </h1>
          
          <p className="text-lg md:text-xl text-purple-50/80 max-w-2xl mx-auto font-medium leading-relaxed mb-12 text-pretty">
            Dapatkan analisis mendalam, laporan komprehensif, dan rekomendasi yang dipersonalisasi dari alat tes berstandar profesional.
          </p>

          {/* Refined Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="relative flex items-center bg-white rounded-3xl border border-slate-200 p-2 shadow-xl shadow-purple-900/20 focus-within:border-purple-500 transition-all">
              <div className="pl-4 pr-2">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari tes premium..."
                className="w-full py-4 px-2 bg-transparent focus:outline-none text-slate-900 font-bold placeholder:text-slate-300"
              />
              <button className="hidden md:block px-8 py-4 bg-purple-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-purple-900/20">
                Cari Tes
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Content Grid ──────────────────────────────────────── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-20">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all border",
                  activeFilter === filter
                    ? "bg-purple-600 border-purple-700 text-white shadow-lg shadow-purple-600/20 -translate-y-0.5"
                    : "bg-white border-slate-200 text-slate-500 hover:border-purple-500 hover:text-purple-600 shadow-sm"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Popular Section */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-[0.3em]">
                  <Star className="w-3 h-3" /> Most Recommended
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Tes Premium Populer</h2>
              </div>
              <div className="h-px bg-slate-200 grow hidden md:block mx-8 mb-4" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {popular.map((test) => (
                <TestListingCard key={test.id} test={test} variant="indigo" />
              ))}
            </div>
          </div>

          {/* Others Section */}
          {others.length > 0 && (
            <div className="mb-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-[0.3em]">
                    <Grid className="w-3 h-3" /> All Assessments
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Eksplorasi Lainnya</h2>
                </div>
                <div className="h-px bg-slate-200 grow hidden md:block mx-8 mb-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {others.map((test) => (
                  <TestListingCard key={test.id} test={test} variant="indigo" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
