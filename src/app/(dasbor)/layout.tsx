'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  Bell,
  LayoutDashboard,
  FileText,
  History,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Users,
  BookOpen,
} from 'lucide-react'

import { useAuthStoreHydrated } from '@/store/auth.store'
import type { UserRole } from '@/store/auth.store'
import { useLogout } from '@/features/auth/hooks'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { NavItem } from '@/features/dashboard/types'

const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  USER: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/pengguna/tes', label: 'Tes Saya', icon: FileText },
    { href: '/pengguna/riwayat', label: 'Riwayat', icon: History },
    { href: '/pengguna/profil', label: 'Profil', icon: Users },
  ],
  ADMIN: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/kelola-tes', label: 'Kelola Tes', icon: BookOpen },
  ],
  SUPERADMIN: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/kelola-tes', label: 'Kelola Tes', icon: BookOpen },
  ],
}

const ROLE_BADGE: Record<UserRole, { label: string; className: string }> = {
  USER: { label: 'User', className: 'bg-slate-100 text-slate-600' },
  ADMIN: { label: 'Admin', className: 'bg-primary-50 text-primary-600' },
  SUPERADMIN: { label: 'Superadmin', className: 'bg-violet-50 text-violet-600' },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname()
  const { user } = useAuthStoreHydrated()
  const logoutMutation = useLogout()

  React.useEffect(() => { setMounted(true) }, [])

  const role: UserRole = (mounted && user?.role) || 'USER'
  const navItems = NAV_BY_ROLE[role]
  const badge = ROLE_BADGE[role]
  const displayName = mounted ? user?.name : ''
  const displayEmail = mounted ? user?.email : ''
  const initials = mounted && user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-slate-900 font-sans selection:bg-primary-100 selection:text-primary-900">

      {/* --- PIXEL PERFECT NAVBAR --- */}
      <header className="sticky top-0 z-50 w-full px-4 pt-4" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto h-16 bg-white/90 backdrop-blur-xl border border-white shadow-sm rounded-2xl px-6 flex items-center justify-between gap-4">

          {/* Left: Logo & Nav */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <Image
                src="/logo/logo_bermoela.png"
                alt="Bermoela"
                width={32}
                height={32}
                className="size-8 object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            {mounted && (
              <nav className="hidden md:flex items-center gap-6">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-sm font-bold transition-all duration-200",
                        isActive
                          ? "text-slate-900"
                          : "text-slate-400 hover:text-slate-900"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            )}
          </div>

          {/* Right: Profile & Icons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="size-10 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors">
              <Search className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="size-10 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors" asChild>
              <Link href="/admin/notifications">
                <Bell className="size-5" />
              </Link>
            </Button>

            {mounted && (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 p-1 rounded-full border border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition-all outline-none">
                    <Avatar className="size-8 rounded-full border border-white shadow-sm">
                      <AvatarFallback className="rounded-full bg-slate-900 text-white text-[10px] font-black">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left pr-2">
                      <p className="text-xs font-black text-slate-900 leading-none truncate max-w-[80px]">{displayName?.split(' ')[0]}</p>
                    </div>
                    <ChevronDown className="size-3.5 text-slate-400 mr-1" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-2xl p-2 mt-2 shadow-2xl border-slate-100" align="end">
                  <DropdownMenuLabel className="px-3 py-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Akun Saya</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{displayEmail}</p>
                    <Badge className={cn('mt-2 text-[9px] font-black uppercase tracking-widest border-0', badge.className)}>
                      {badge.label}
                    </Badge>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="rounded-xl py-2.5 px-3 cursor-pointer font-bold text-slate-600 focus:bg-primary-50 focus:text-primary-700" asChild>
                    <Link href="/dashboard/profil">Profil Lengkap</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="rounded-xl py-2.5 px-3 cursor-pointer text-red-500 font-black focus:bg-red-50 focus:text-red-600 flex items-center gap-2"
                    onClick={() => logoutMutation.mutate()}
                  >
                    <LogOut className="size-4" /> KELUAR
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden size-10 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {children}
      </main>

      {/* --- FOOTER --- */}
      <footer className="max-w-7xl mx-auto px-8 py-10 border-t border-slate-200/50 text-slate-400">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">© 2026 Bermoela — Indonesian Life School</p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[10px] font-black hover:text-slate-900 transition-colors uppercase tracking-widest">Bantuan</Link>
            <Link href="#" className="text-[10px] font-black hover:text-slate-900 transition-colors uppercase tracking-widest">Kebijakan</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
