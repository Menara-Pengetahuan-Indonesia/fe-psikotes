'use client'

import { useState, useMemo } from 'react'
import { Search, Sparkles, Plus, Hexagon, Diamond, Grid, BookOpen } from 'lucide-react'

import { TestListingCard } from '@features/psikotes/components'
import { GRATIS_TESTS } from '@features/psikotes/constants'
import { cn } from '@/lib/utils'

const FILTER_TABS = ['Semua', 'Kepribadian', 'Karir', 'Hubungan', 'Edukasi', 'Kesehatan Mental']

export function GratisListing() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('Semua')

  const filtered = useMemo(() => {
    return GRATIS_TESTS.filter((test) => {
      const matchesSearch = test.title.toLowerCase().includes(search.toLowerCase())
      const matchesTab = activeTab === 'Semua' || test.subCategory === activeTab
      return matchesSearch && matchesTab
    })
  }, [search, activeTab])

  const popular = filtered.slice(0, 4)
  const others = filtered.slice(4)

  return (
    <div className="min-h-screen bg-[#fefce8]">
      {/* ── Vibrant Hero ───────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-linear-to-b from-emerald-800 via-emerald-700 to-emerald-500 text-white pt-32 pb-20 md:pt-40 md:pb-32">
        {/* --- RICH BACKGROUND ORNAMENTS --- */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='white' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`,
               backgroundSize: '400px 400px'
             }}
        />

        {/* Ambient Glows (Subtle Transition) */}
        <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-125 h-125 bg-emerald-300/20 rounded-full blur-[120px] pointer-events-none" />

        <Plus className="absolute top-[15%] left-[10%] text-emerald-300/30 w-8 h-8 animate-pulse" />
        <Hexagon className="absolute top-[40%] right-[10%] text-white/5 w-24 h-24 -rotate-12 animate-float-slow" />
        <Diamond className="absolute bottom-[10%] left-[20%] text-amber-400/20 w-16 h-16 rotate-12 animate-float-medium" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700/50 border border-emerald-400/30 shadow-lg backdrop-blur-md mb-8 mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-black tracking-[0.2em] text-emerald-50 uppercase">
              Unlimited Learning
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none mb-6 drop-shadow-lg">
            Kumpulan Tes <br />
            <span className="text-amber-300">Psikologi Gratis</span>
          </h1>

          <p className="text-lg md:text-xl text-emerald-50/80 max-w-2xl mx-auto font-medium leading-relaxed mb-12 text-pretty">
            Mulai perjalanan mengenal diri dengan berbagai alat tes psikologi berbasis riset yang dapat diakses secara cuma-cuma.
          </p>

          {/* Refined Search Bar (Non-3D) */}
          <div className="max-w-xl mx-auto relative group">
            <div className="relative flex items-center bg-white rounded-3xl border border-slate-200 p-2 shadow-xl shadow-emerald-900/20 focus-within:border-emerald-500 transition-all">
              <div className="pl-4 pr-2">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari jenis tes (misal: Kepribadian, Karir...)"
                className="w-full py-4 px-2 bg-transparent focus:outline-none text-slate-900 font-bold placeholder:text-slate-300"
              />
              <button className="hidden md:block px-8 py-4 bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-emerald-700/20">
                Cari Tes
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Content Grid ──────────────────────────────────────── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Filter Tabs (Refined Pills) */}
          <div className="flex flex-wrap gap-3 justify-center mb-20">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all border",
                  activeTab === tab
                    ? "bg-emerald-600 border-emerald-700 text-white shadow-lg shadow-emerald-600/20 -translate-y-0.5"
                    : "bg-white border-slate-200 text-slate-500 hover:border-emerald-500 hover:text-emerald-600 shadow-sm"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tes Terpopuler Section */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">
                  <Grid className="w-3 h-3" /> Popular Choices
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Tes Terpopuler</h2>
              </div>
              <div className="h-px bg-slate-200 grow hidden md:block mx-8 mb-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {popular.map((test) => (
                <TestListingCard key={test.id} test={test} variant="emerald" />
              ))}
            </div>
          </div>

          {/* Special Section Break (Dark Emerald) */}
          <div className="my-32 p-12 md:p-20 rounded-[3.5rem] relative overflow-hidden text-center text-white"
               style={{ background: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)' }}>
             <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='white' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
             <div className="relative z-10 space-y-6">
                <Sparkles className="w-12 h-12 text-amber-300 mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">Buka Potensi Tak Terbatas</h2>
                <p className="text-lg text-emerald-100 max-w-xl mx-auto font-medium opacity-80">
                   Ribuan orang telah mencoba tes gratis kami dan memulai perjalanan perubahan hidup. Jadilah salah satu dari mereka hari ini.
                </p>
             </div>
          </div>

          {/* Tes Lainnya Section */}
          {others.length > 0 && (
            <div className="mb-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">
                    <BookOpen className="w-3 h-3" /> More Assessments
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Eksplorasi Lainnya</h2>
                </div>
                <div className="h-px bg-slate-200 grow hidden md:block mx-8 mb-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {others.map((test) => (
                  <TestListingCard key={test.id} test={test} variant="emerald" />
                ))}
              </div>
            </div>
          )}

          {/* Clean Load More Button */}
          <div className="mt-16 text-center">
            <button className="px-12 py-5 bg-white border-2 border-emerald-800 text-emerald-800 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-emerald-800 hover:text-white transition-all shadow-xl shadow-emerald-800/5">
              Muat Lebih Banyak Assessments
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
