import type { Metadata } from 'next'
import { RelationshipProductGrid } from '@/features/psikotes/components'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Relationship — Bermoela',
  description: 'Assessment untuk red flag pasangan, konflik rumah tangga, kesepian dalam pernikahan, dan kehidupan single.',
}

export default function RelationshipPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-linear-to-b from-rose-900 to-rose-700 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
            <Heart className="w-4 h-4 text-rose-200" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Relationship</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
            Hubungan yang <span className="text-rose-200 italic">Lebih Sehat</span>
          </h1>
          <p className="text-rose-100/70 font-medium max-w-2xl mx-auto text-base md:text-lg">
            Dari red flag pasangan baru hingga kesepian dalam pernikahan — asesmen untuk memahami pola relasi dan membangun hubungan yang benar-benar bermakna.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <RelationshipProductGrid />
        </div>
      </section>
    </main>
  )
}
