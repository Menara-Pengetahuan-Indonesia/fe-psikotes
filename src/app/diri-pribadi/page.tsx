import type { Metadata } from 'next'
import { DIRI_PRIBADI_PRODUCTS } from '@/features/psikotes/constants'
import { ProductCardNew } from '@/features/psikotes/components'
import { User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Diri Pribadi — Bermoela',
  description: 'Assessment psikologis untuk trauma, anxiety, burnout, self-worth, dan perencanaan karir.',
}

export default function DiriPribadiPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-linear-to-b from-primary-900 to-primary-700 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
            <User className="w-4 h-4 text-accent-300" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Diri Pribadi</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
            Kenali Dirimu <span className="text-accent-300 italic">Lebih Dalam</span>
          </h1>
          <p className="text-primary-100/70 font-medium max-w-2xl mx-auto text-base md:text-lg">
            Dari luka batin hingga perencanaan karir — asesmen berbasis riset untuk memahami siapa kamu dan ke mana kamu mau pergi.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIRI_PRIBADI_PRODUCTS.map((product) => (
              <ProductCardNew key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
