'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth.store'
import { useUIStore } from '@/store/ui.store'
import { cn } from '@/lib/utils'

export function DashboardSidebar() {
  const pathname = usePathname()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)

  const navItems = [
    { href: '/user', label: 'Dashboard', roles: ['user', 'company', 'admin'] },
    { href: '/user/tests', label: 'Tes Saya', roles: ['user'] },
    { href: '/company', label: 'Company', roles: ['company', 'admin'] },
    { href: '/admin', label: 'Admin', roles: ['admin'] },
  ]

  const filteredNav = navItems.filter((item) => user && item.roles.includes(user.role))

  return (
    <aside className={cn('border-r bg-background transition-all', sidebarOpen ? 'w-64' : 'w-0 overflow-hidden')}>
      <div className="flex h-full flex-col p-4">
        <h2 className="mb-4 text-lg font-semibold">Menu</h2>
        <nav className="flex-1 space-y-1">
          {filteredNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn('block rounded px-3 py-2 hover:bg-muted', pathname === item.href && 'bg-muted')}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button variant="outline" onClick={logout} className="w-full">Logout</Button>
      </div>
    </aside>
  )
}
