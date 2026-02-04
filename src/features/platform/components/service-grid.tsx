'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ServiceCard } from '@/shared/components'
import { SERVICES } from '../constants'

const TAB_FILTERS: Record<string, string[]> = {
  semua: [],
  psikotes: ['Terpopuler', 'Karir'],
  konseling: ['Klinis', 'Personal'],
}

export function ServiceGrid() {
  const filtered = (tab: string) =>
    TAB_FILTERS[tab]?.length === 0 ? SERVICES : SERVICES.filter((s) => TAB_FILTERS[tab]?.includes(s.tag))

  return (
    <section className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Layanan Kami</h2>
          <p className="text-slate-500">Pilih layanan yang sesuai dengan kebutuhanmu</p>
        </div>
        <Tabs defaultValue="semua" className="w-full">
          <TabsList className="mx-auto flex justify-center mb-8">
            <TabsTrigger value="semua">Semua</TabsTrigger>
            <TabsTrigger value="psikotes">Psikotes</TabsTrigger>
            <TabsTrigger value="konseling">Konseling</TabsTrigger>
          </TabsList>
          {Object.keys(TAB_FILTERS).map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered(tab).map((service) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    price={service.price}
                    tag={service.tag}
                    icon={service.icon}
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
