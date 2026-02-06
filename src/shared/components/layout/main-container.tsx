'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  return (
    <main 
      className={cn(
        "relative z-10 bg-white shadow-2xl transition-all duration-500",
        isHomepage 
          ? "h-dvh overflow-hidden mb-0 rounded-none" 
          : "rounded-b-[80px] md:rounded-b-[120px] overflow-hidden mb-[400px] min-h-screen"
      )}
    >
      {children}
    </main>
  )
}
