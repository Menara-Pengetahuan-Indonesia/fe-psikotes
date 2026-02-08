'use client'

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { AppSidebar } from '@/features/dashboard'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider
      style={{
        '--background': '#ffffff',
        '--foreground': '#0f172a',
        '--card': '#ffffff',
        '--card-foreground': '#0f172a',
        '--popover': '#ffffff',
        '--popover-foreground': '#0f172a',
        '--muted': '#f1f5f9',
        '--muted-foreground': '#64748b',
        '--border': '#e2e8f0',
        '--input': '#e2e8f0',
      } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4"
          />
          <span className="text-sm font-medium text-slate-700">
            Dashboard
          </span>
        </header>
        <main className="flex-1 bg-white p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
