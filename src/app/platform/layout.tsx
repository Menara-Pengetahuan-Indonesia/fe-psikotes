import { PromoBanner, PlatformNavbar, PlatformFooter } from '@/features/platform/components'

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <PromoBanner />
      <PlatformNavbar />
      <div className="flex-1">{children}</div>
      <PlatformFooter />
    </div>
  )
}
