'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ServiceCard } from '@/shared/components'
import { SERVICES } from '../constants'
import { Grid, Plus } from 'lucide-react'

const TAB_FILTERS: Record<string, string[]> = {
  semua: [],
  psikotes: ['Terpopuler', 'Karir', 'Edukasi', 'Premium'],
  konseling: ['Klinis', 'Personal'],
}

export function ServiceGrid() {
  const filtered = (tab: string) =>
    TAB_FILTERS[tab]?.length === 0 ? SERVICES : SERVICES.filter((s) => TAB_FILTERS[tab]?.includes(s.tag))

  return (
    <section className="py-24 md:py-36 bg-[#fefce8] relative overflow-hidden">
      {/* --- BACKGROUND ORNAMENTS --- */}
      <Plus className="absolute top-20 right-10 text-emerald-600/10 w-12 h-12" />
      <Plus className="absolute bottom-20 left-10 text-amber-600/10 w-8 h-8 rotate-45" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-stone-200 text-stone-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
             <Grid className="w-3 h-3 text-emerald-600" />
             Explore Services
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-stone-800 leading-[1.1]">
            Layanan <span className="text-emerald-600 relative inline-block">Profesional
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-emerald-400/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Pilih solusi yang tepat untuk kebutuhan pengembangan diri dan kesehatan mentalmu.
          </p>
        </div>
        
        {/* Tabs & Content */}
        <Tabs defaultValue="semua" className="w-full">
          <TabsList className="mx-auto flex justify-center w-fit mb-16 bg-white border-2 border-stone-200 p-1.5 rounded-full shadow-xl shadow-stone-200/50 backdrop-blur-sm">
            {['semua', 'psikotes', 'konseling'].map((tab) => (
              <TabsTrigger 
                key={tab}
                value={tab} 
                className="capitalize rounded-full px-8 py-3 font-black text-stone-500 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:text-emerald-700"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.keys(TAB_FILTERS).map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0 outline-none">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {filtered(tab).map((service) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    price={service.price}
                    tag={service.tag}
                    icon={service.icon}
                    actionLabel="Ambil Paket"
                    onAction={() => {}}
                    className="h-full"
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

