'use client'

import { DashboardSidebar } from '@/features/dashboard'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto pt-16 p-4 md:pt-8 md:p-8">
        {children}
      </main>
    </div>
  )
}
