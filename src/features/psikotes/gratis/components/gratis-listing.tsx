'use client'

import { useState, useMemo } from 'react'
import { Search, Sparkles, Users, Clock, Brain, X, Construction } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GRATIS_TESTS } from '@/features/psikotes/constants'
import { GRATIS_FILTER_TABS } from '../constants'
import type { PsikotesTest } from '@/features/psikotes/types'

export function GratisListing() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('Semua')
  const [selectedTest, setSelectedTest] = useState<PsikotesTest | null>(null)

  const filtered = useMemo(() => {
    return GRATIS_TESTS.filter((test) => {
      const matchesSearch = test.title.toLowerCase().includes(search.toLowerCase())
      const matchesTab = activeTab === 'Semua'
        || test.subCategory === activeTab
        || (activeTab === 'Kesehatan Mental' && test.subCategory === 'Mental Health')
      return matchesSearch && matchesTab
    })
  }, [search, activeTab])

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 via-white to-white pt-32 pb-20">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-100/50 rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-accent-100/40 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100">
            <Sparkles className="w-4 h-4 text-primary-600 fill-primary-600" />
            <span className="text-xs font-black text-primary-700 uppercase tracking-widest">Gratis & Tanpa Daftar</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[0.95]">
            Tes Psikologi <span className="text-accent-500 italic">Gratis</span>
          </h1>

          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Mulai kenali dirimu melalui berbagai tes psikologi berbasis riset — gratis, tanpa batas waktu, dan bisa diakses kapan saja.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl border border-slate-200 shadow-lg">
              <div className="pl-5 pr-2">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari tes (misal: Kepribadian, Karir...)"
                className="w-full py-4 px-2 bg-transparent focus:outline-none text-slate-900 font-semibold placeholder:text-slate-300 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute top-[-8%] right-[-6%] w-[350px] h-[350px] bg-accent-100/30 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {GRATIS_FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-xs font-bold transition-all border',
                  activeTab === tab
                    ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/20'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-primary-300 hover:text-primary-600'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-slate-400 font-medium mb-6">
            {filtered.length} tes ditemukan
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Brain className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">Tidak Ada Tes</h3>
              <p className="text-sm text-slate-500">Coba ubah kata kunci atau filter kategori.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map((test) => (
                <GratisTestCard key={test.id} test={test} onSelect={() => setSelectedTest(test)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Motivational CTA */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative p-8 md:p-12 rounded-[3rem] bg-primary-600 shadow-2xl shadow-primary-900/20 overflow-hidden">
            <div className="relative z-10 text-center space-y-6">
              <Sparkles className="w-10 h-10 text-accent-300 mx-auto" />
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Ingin Hasil Lebih <span className="text-accent-300 italic">Mendalam?</span>
              </h2>
              <p className="text-primary-50 font-medium text-sm md:text-base max-w-xl mx-auto">
                Upgrade ke paket premium untuk mendapatkan laporan komprehensif, rekomendasi personal, dan konsultasi dengan psikolog berlisensi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {selectedTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSelectedTest(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center space-y-5">
            <button
              onClick={() => setSelectedTest(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto">
              <Construction className="w-8 h-8 text-amber-500" />
            </div>

            <h3 className="text-xl font-black text-slate-900">{selectedTest.title}</h3>

            <p className="text-slate-500 text-sm leading-relaxed">
              Tes ini sedang dalam tahap pengembangan dan belum tersedia untuk saat ini. Kami akan segera menghadirkannya untukmu.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setSelectedTest(null)}
                className="px-8 h-12 rounded-xl bg-primary-600 text-white text-sm font-bold hover:bg-primary-700 transition-colors"
              >
                Oke, Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function GratisTestCard({ test, onSelect }: { test: PsikotesTest; onSelect: () => void }) {
  const Icon = test.icon

  return (
    <button
      onClick={onSelect}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col text-left"
    >
      <div className="p-6 flex-1 space-y-4">
        <div className="flex items-start justify-between">
          <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          {test.subCategory && (
            <span className="px-2.5 py-1 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 rounded-full border border-slate-100">
              {test.subCategory}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <h3 className="font-bold text-base text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">
            {test.title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
            {test.description}
          </p>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3 text-primary-400" /> {test.users}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-300" /> {test.duration}
          </span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-center justify-center h-10 rounded-xl bg-primary-600 text-white text-xs font-bold group-hover:bg-primary-700 transition-colors">
          Mulai Tes Gratis
        </div>
      </div>
    </button>
  )
}
