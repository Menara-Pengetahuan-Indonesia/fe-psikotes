'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ServiceCard } from '@/shared/components'
import { SERVICES } from '../constants'

const TAB_FILTERS: Record<string, string[]> = {
  semua: [],
  psikotes: ['Terpopuler', 'Karir', 'Edukasi', 'Premium'],
  konseling: ['Klinis', 'Personal'],
}

export function ServiceGrid() {
  const filtered = (tab: string) =>
    TAB_FILTERS[tab]?.length === 0 ? SERVICES : SERVICES.filter((s) => TAB_FILTERS[tab]?.includes(s.tag))

  return (
    <section className="py-20 md:py-32 bg-primary-50 relative">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-secondary-900 to-primary-50 opacity-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-secondary-900">Layanan Kami</h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Pilih layanan profesional yang dirancang khusus untuk mendukung perkembangan diri dan kesehatan mentalmu.
          </p>
        </div>
        
        <Tabs defaultValue="semua" className="w-full">
          <TabsList className="mx-auto flex justify-center w-fit mb-12 bg-white/50 border border-primary-200 p-1 rounded-full shadow-sm backdrop-blur-sm">
            <TabsTrigger 
              value="semua" 
              className="rounded-full px-6 py-2 data-[state=active]:bg-primary-600 data-[state=active]:text-white text-secondary-600 hover:text-secondary-800"
            >
              Semua
            </TabsTrigger>
            <TabsTrigger 
              value="psikotes"
               className="rounded-full px-6 py-2 data-[state=active]:bg-primary-600 data-[state=active]:text-white text-secondary-600 hover:text-secondary-800"
            >
              Psikotes
            </TabsTrigger>
            <TabsTrigger 
              value="konseling"
               className="rounded-full px-6 py-2 data-[state=active]:bg-primary-600 data-[state=active]:text-white text-secondary-600 hover:text-secondary-800"
            >
              Konseling
            </TabsTrigger>
          </TabsList>
          
          {Object.keys(TAB_FILTERS).map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {filtered(tab).map((service) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    price={service.price}
                    tag={service.tag}
                    icon={service.icon}
                    className="bg-white/80 backdrop-blur-sm border-primary-100 hover:border-primary-300"
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
