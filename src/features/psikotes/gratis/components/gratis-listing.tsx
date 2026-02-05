'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

import { TestListingCard } from '@features/psikotes/components'
import { GRATIS_TESTS } from '@features/psikotes/constants'

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
    <>
      {/* Header / Hero */}
      <header className="pt-32 pb-20 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <span className="inline-block py-1 px-3 rounded-full bg-black text-white text-[10px] font-bold tracking-widest uppercase">
            Free Access
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
            Kumpulan Tes <span className="text-slate-400">Psikologi Gratis</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Mulai perjalanan mengenal diri dengan berbagai alat tes psikologi berbasis riset yang dapat diakses secara cuma-cuma.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mt-8">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari tes psikologi..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all shadow-sm text-sm font-medium"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Test Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-16">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border ${
                  activeTab === tab
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-black hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tes Terpopuler */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Tes Terpopuler</h2>
              <div className="h-px bg-slate-200 flex-grow" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popular.map((test) => (
                <TestListingCard key={test.id} test={test} />
              ))}
            </div>
          </div>

          {/* Tes Lainnya */}
          {others.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Tes Lainnya</h2>
                <div className="h-px bg-slate-200 flex-grow" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {others.map((test) => (
                  <TestListingCard key={test.id} test={test} />
                ))}
              </div>
            </div>
          )}

          {/* Load More (placeholder) */}
          <div className="mt-16 text-center">
            <button className="px-10 py-4 border border-slate-200 text-slate-500 rounded-2xl text-xs font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all">
              Load More Tests
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
