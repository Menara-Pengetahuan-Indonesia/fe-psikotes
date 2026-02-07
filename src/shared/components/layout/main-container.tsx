'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isHomepage = pathname === '/'
  const isAuthPage = pathname === '/masuk'
    || pathname === '/daftar'
    || pathname === '/forgot-password'

  return (
    <main
      className={cn(
        "relative z-10 transition-all duration-500",
        isHomepage
          ? "bg-slate-50 h-dvh overflow-hidden mb-0 rounded-none"
          : isAuthPage
            ? "bg-white min-h-dvh mb-0 rounded-none"
            : "bg-[#faf5e4] rounded-b-[80px] md:rounded-b-[120px] overflow-clip mb-[400px] min-h-screen"
      )}
    >
      <div className={cn(
        "min-h-full w-full",
        isHomepage
          ? "bg-slate-50"
          : isAuthPage
            ? "bg-white"
            : "bg-[#faf5e4]"
      )}>
        {children}
      </div>
    </main>
  )
}
