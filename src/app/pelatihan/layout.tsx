import { Navbar, Footer } from '@/components/layout'
import { pelatihanNavItems } from '@/config/navigation'

export default function PelatihanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navItems={pelatihanNavItems} />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
