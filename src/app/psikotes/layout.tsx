import { Navbar, Footer } from '@/components/layout'
import { PromoBanner } from '@/features/psikotes/components'
import { psikotesNavItems } from '@/config/navigation'

export default function PsikotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <PromoBanner />
      <Navbar navItems={psikotesNavItems} />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
