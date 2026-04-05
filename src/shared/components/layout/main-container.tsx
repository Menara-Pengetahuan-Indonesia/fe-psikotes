'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isAuthPage = pathname === '/masuk'
    || pathname === '/daftar'
    || pathname === '/forgot-password'
    || pathname.startsWith('/mahasiswa/try-out/form')
  const isDashboard = pathname.startsWith('/dashboard')
    || pathname.startsWith('/pengguna')
    || pathname.startsWith('/admin')
    || pathname.startsWith('/perusahaan')
    || pathname.startsWith('/superadmin')
  const isExam = pathname.includes('/exam') || pathname.includes('/result') || pathname.match(/\/psikotes\/(gratis|premium)\/[^/]+$/) || pathname.startsWith('/tes/')

  return (
    <main
      className={cn(
        "relative z-10 transition-all duration-500",
        isExam
          ? "bg-[#F2F2F7] min-h-dvh mb-0 rounded-none"
          : pathname.startsWith('/mahasiswa/try-out/form')
            ? "bg-[#F2F2F7] min-h-dvh mb-0 rounded-none"
          : isAuthPage
            ? "bg-white min-h-dvh mb-0 rounded-none"
            : isDashboard
              ? "bg-slate-50 min-h-dvh mb-0 rounded-none"
              : "bg-background rounded-b-[80px] md:rounded-b-[120px] overflow-clip mb-[400px] min-h-screen"
      )}
    >
      <div className={cn(
        "min-h-full w-full",
        isExam
          ? "bg-[#F2F2F7]"
          : pathname.startsWith('/mahasiswa/try-out/form')
            ? "bg-[#F2F2F7]"
            : isAuthPage
              ? "bg-white"
              : isDashboard
                ? "bg-slate-50"
                : "bg-background"
      )}>
        {children}
      </div>
    </main>
  )
}
