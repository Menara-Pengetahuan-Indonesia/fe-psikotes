import { Navbar, Footer } from '@/shared/components/layout'
import { konselingNavItems } from '@/config/navigation'

export default function KonselingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navItems={konselingNavItems} />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
