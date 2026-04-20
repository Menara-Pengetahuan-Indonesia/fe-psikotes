'use client'

import { User } from 'lucide-react'
import { usePublicPackages } from '@/features/psikotes/hooks/use-public-packages'
import { ChildPackageCard, PackageGridSkeleton, PackageEmptyState } from '@/features/psikotes/components/package-card'

export default function DiriPribadiPage() {
  const { data: packages, isLoading } = usePublicPackages()
  const pkg = packages?.find(p => p.name.toLowerCase().includes('diri'))
  const children = pkg?.childPackages?.filter(c => c.isActive) ?? []

  return (
    <main className="min-h-screen bg-background">
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

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <PackageGridSkeleton />
          ) : children.length === 0 ? (
            <PackageEmptyState message="Belum ada paket tes untuk kategori Diri Pribadi. Silakan cek kembali nanti." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child) => (
                <ChildPackageCard key={child.id} child={child} categorySlug="diri-pribadi" />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
