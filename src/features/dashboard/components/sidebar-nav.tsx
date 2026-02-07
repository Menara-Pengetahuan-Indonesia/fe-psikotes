'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  History,
  UserCircle,
  LogOut,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAuthStore } from '@/store/auth.store'
import { cn } from '@/lib/utils'

export interface SidebarNavItem {
  href: string
  label: string
  icon: LucideIcon
}

export const NAV_ITEMS: SidebarNavItem[] = [
  { href: '/pengguna', label: 'Dasbor', icon: LayoutDashboard },
  { href: '/pengguna/tes', label: 'Tes Saya', icon: FileText },
  {
    href: '/pengguna/riwayat',
    label: 'Riwayat Hasil',
    icon: History,
  },
  { href: '/pengguna/profil', label: 'Profil', icon: UserCircle },
]

export function BermoelaBrand() {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'flex h-9 w-9 shrink-0',
          'items-center justify-center',
          'rounded-lg bg-emerald-500',
          'text-sm font-black text-white'
        )}
      >
        B
      </div>
      <span className="font-bold text-slate-800 tracking-tight">
        BER<span className="text-emerald-600">MOELA</span>
      </span>
    </div>
  )
}

export function NavLinks({
  onNavigate,
}: {
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  return (
    <nav className="flex-1 space-y-1">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        return (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              'w-full justify-start gap-3 px-3',
              'cursor-pointer font-medium',
              isActive
                ? cn(
                  'bg-emerald-50 text-emerald-700',
                  'hover:bg-emerald-100',
                  'hover:text-emerald-700'
                )
                : cn(
                  'text-slate-600',
                  'hover:bg-slate-100',
                  'hover:text-slate-900'
                )
            )}
            asChild
          >
            <Link href={item.href} onClick={onNavigate}>
              <Icon
                className={cn(
                  'h-5 w-5 shrink-0',
                  isActive
                    ? 'text-emerald-600'
                    : 'text-slate-400'
                )}
              />
              {item.label}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}

export function CollapsedNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 space-y-1">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        return (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'w-full cursor-pointer',
                  isActive
                    ? cn(
                      'bg-emerald-50 text-emerald-700',
                      'hover:bg-emerald-100',
                      'hover:text-emerald-700'
                    )
                    : cn(
                      'text-slate-600',
                      'hover:bg-slate-100',
                      'hover:text-slate-900'
                    )
                )}
                asChild
              >
                <Link href={item.href}>
                  <Icon
                    className={cn(
                      'h-5 w-5',
                      isActive
                        ? 'text-emerald-600'
                        : 'text-slate-400'
                    )}
                  />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {item.label}
            </TooltipContent>
          </Tooltip>
        )
      })}
    </nav>
  )
}

export function UserFooter({
  showInfo,
}: {
  showInfo: boolean
}) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="space-y-2">
      {showInfo && user && (
        <div className="px-3 py-2">
          <p
            className={cn(
              'text-sm font-semibold',
              'text-slate-800 truncate'
            )}
          >
            {user.name}
          </p>
          <p className="text-xs text-slate-400 truncate">
            {user.email}
          </p>
        </div>
      )}
      <Button
        variant="ghost"
        onClick={logout}
        className={cn(
          'w-full justify-start gap-3 px-3',
          'cursor-pointer text-slate-600',
          'hover:bg-red-50 hover:text-red-600'
        )}
      >
        <LogOut className="h-5 w-5 shrink-0" />
        {showInfo && (
          <span className="text-sm">Keluar</span>
        )}
      </Button>
    </div>
  )
}
