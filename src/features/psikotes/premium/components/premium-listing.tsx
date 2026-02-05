'use client'

import { useState } from 'react'
import { Search, Star } from 'lucide-react'

import { TestListingCard } from '@/features/psikotes/components'
import { PREMIUM_TESTS } from '@/features/psikotes/constants'

const FILTERS = ['Semua', 'Karir & Profesi', 'Klinis', 'Kepribadian', 'Edukasi']

export function PremiumListing() {
  const [activeFilter, setActiveFilter] = useState('Semua')
  const [search, setSearch] = useState('')

  const filtered = PREMIUM_TESTS.filter((t) => {
    const matchesSearch =
      search === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())

    if (activeFilter === 'Semua') return matchesSearch

    return matchesSearch && (t.subCategory === activeFilter || t.tag === activeFilter)
  })

  const popular = filtered.slice(0, 4)
  const others = filtered.slice(4)

  return (
    <>
      {/* Dark Header */}
      <header className="pt-32 pb-20 px-6 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white text-black text-[10px] font-bold tracking-widest uppercase">
            <Star className="w-3 h-3 fill-black" /> Premium Access
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Investasi Terbaik <span className="text-slate-400">Untuk Dirimu</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Dapatkan analisis mendalam, laporan komprehensif, dan rekomendasi yang dipersonalisasi dari alat tes berstandar profesional.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mt-8">
            <input
              type="text"
              placeholder="Cari tes premium..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all shadow-xl text-sm font-medium text-white placeholder:text-slate-500"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Test Grid */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-16">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border ${
                  activeFilter === filter
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-black hover:text-black'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Tes Premium Populer */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Tes Premium Populer</h2>
              <div className="h-px bg-slate-200 flex-grow" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popular.map((test) => (
                <TestListingCard key={test.id} test={test} />
              ))}
            </div>
          </div>

          {/* Tes Premium Lainnya */}
          {others.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Tes Premium Lainnya</h2>
                <div className="h-px bg-slate-200 flex-grow" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {others.map((test) => (
                  <TestListingCard key={test.id} test={test} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
