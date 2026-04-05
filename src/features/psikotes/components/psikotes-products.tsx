'use client'

import { useState } from 'react'
import {
  ArrowRight,
  Star,
  Zap,
  Target
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PREMIUM_TESTS } from '../constants'

export function PsikotesProducts() {
  const [filter, setFilter] = useState<'all' | 'Intelligence' | 'Kepribadian' | 'Karir & Studi' | 'Hubungan'>('all')

  const filteredProducts = filter === 'all' 
    ? PREMIUM_TESTS 
    : PREMIUM_TESTS.filter(p => p.subCategory === filter)

  type FilterCategory = typeof filter

  const categories: { id: FilterCategory; label: string }[] = [
    { id: 'Kepribadian', label: 'Diri Sendiri' },
    { id: 'Hubungan', label: 'Relationship' },
    { id: 'Karir & Studi', label: 'Karir' },
    { id: 'all', label: 'Semua Produk' }
  ]

  return (
    <section id="masa-depan" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="space-y-12 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 border border-accent-200 shadow-sm">
               <Zap className="w-3 h-3 text-accent-600 fill-accent-600" />
               <span className="text-xs font-black text-accent-700 uppercase tracking-widest">Premium Assessment</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Ambil Senjata <span className="text-primary-600 italic">Transformasimu</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm md:text-base">
              Setiap alat tes dirancang untuk membongkar kebenaran yang kamu butuhkan guna melepaskan belenggu masa lalu sekarang juga.
            </p>
          </div>

          {/* Filter Tabs - CLEAN ROW BELOW HEADER */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 border",
                  filter === cat.id 
                    ? "bg-primary-600 text-white border-primary-600 shadow-xl shadow-primary-900/20 -translate-y-1" 
                    : "bg-white text-slate-400 border-slate-100 hover:border-primary-200 hover:text-primary-600 shadow-sm"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-[2rem] border border-slate-100 shadow-soft hover:shadow-xl transition-shadow duration-300 flex flex-col p-6"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center",
                  "bg-slate-50 text-primary-600"
                )}>
                  <product.icon className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-50 text-xs font-black text-slate-400 uppercase tracking-widest">
                  {product.tag}
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="font-black text-lg text-slate-900 leading-tight group-hover:text-primary-600 transition-colors">
                  {product.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-1.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold text-slate-600">{product.users}</span>
                   </div>
                   <span className="text-sm font-black text-slate-900">{product.price}</span>
                </div>
                
                <a 
                  href={`/pembayaran?id=${product.id}`}
                  className="w-full h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-primary-700 transition-all shadow-lg shadow-primary-100"
                >
                  Pilih Layanan <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - PLAIN BRAND GREEN */}
        <div className="mt-20 p-8 md:p-12 rounded-[3rem] bg-primary-600 shadow-2xl shadow-primary-900/20 relative overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                 <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-none">
                    Masih Bingung Menentukan <span className="text-accent-300 italic">Titik Mula?</span>
                 </h3>
                 <p className="text-primary-50 font-medium text-sm md:text-base max-w-xl">
                    Gunakan fitur analisis AI kami untuk mendapatkan rekomendasi produk yang paling sesuai dengan kondisimu saat ini.
                 </p>
              </div>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 h-16 rounded-2xl bg-white text-primary-600 text-sm font-black uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all flex items-center gap-3 shrink-0"
              >
                 Mulai Analisis Sekarang <Target className="w-5 h-5" />
              </button>
           </div>
        </div>

      </div>
    </section>
  )
}
