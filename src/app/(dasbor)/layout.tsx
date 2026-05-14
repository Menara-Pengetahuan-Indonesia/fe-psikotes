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
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  BookOpen,
  Package,
  Sparkles,
  ClipboardList,
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

type NavGroup = { label?: string; items: NavItem[] }

const NAV_BY_ROLE: Record<UserRole, NavGroup[]> = {
  USER: [
    {
      label: 'Menu Utama',
      items: [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/pengguna/paket-saya', label: 'Paket Saya', icon: Package },
        { href: '/pengguna/tes', label: 'Tes Saya', icon: FileText },
        { href: '/pengguna/riwayat', label: 'Riwayat', icon: History },
      ],
    },
    {
      label: 'Akun',
      items: [{ href: '/pengguna/profil', label: 'Profil', icon: Users }],
    },
  ],
  ADMIN: [
    {
      items: [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/kelola-tes', label: 'Kelola Tes', icon: BookOpen },
        { href: '/admin/results', label: 'Hasil Peserta', icon: ClipboardList },
      ],
    },
  ],
  SUPERADMIN: [
    {
      items: [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/kelola-tes', label: 'Kelola Tes', icon: BookOpen },
        { href: '/admin/results', label: 'Hasil Peserta', icon: ClipboardList },
      ],
    },
  ],
}

const BREADCRUMB_LABELS: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/pengguna/paket-saya': 'Paket Saya',
  '/pengguna/tes': 'Tes Saya',
  '/pengguna/riwayat': 'Riwayat',
  '/pengguna/profil': 'Profil',
  '/admin/kelola-tes': 'Kelola Tes',
  '/admin/results': 'Hasil Peserta',
  '/admin/kelola-pengguna': 'Kelola Pengguna',
  '/admin/kelola-paket': 'Kelola Paket',
  '/admin/kelola-produk': 'Kelola Produk',
  '/admin/kelola-artikel': 'Kelola Artikel',
  '/admin/kelola-kategori': 'Kelola Kategori',
  '/admin/kelola-layanan': 'Kelola Layanan',
  '/admin/notifications': 'Notifikasi',
  '/perusahaan': 'Perusahaan',
  '/perusahaan/karyawan': 'Karyawan',
  '/perusahaan/laporan': 'Laporan',
  '/superadmin': 'Superadmin',
}

function buildBreadcrumbs(pathname: string): Array<{ href: string; label: string }> {
  if (!pathname || pathname === '/dashboard') return []
  const segments = pathname.split('/').filter(Boolean)
  const crumbs: Array<{ href: string; label: string }> = []
  let acc = ''
  for (const seg of segments) {
    acc += `/${seg}`
    const label =
      BREADCRUMB_LABELS[acc] ??
      seg
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    crumbs.push({ href: acc, label })
  }
  return crumbs
}

const ROLE_BADGE: Record<UserRole, { label: string; className: string }> = {
  USER: { label: 'User', className: 'bg-primary-50 text-primary-700 border border-primary-100' },
  ADMIN: { label: 'Admin', className: 'bg-amber-50 text-amber-800 border border-amber-100' },
  SUPERADMIN: {
    label: 'Superadmin',
    className: 'bg-violet-50 text-violet-700 border border-violet-100',
  },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname()
  const { user } = useAuthStoreHydrated()
  const logoutMutation = useLogout()

  React.useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('sidebar-collapsed')
    if (stored === '1') setIsCollapsed(true)
  }, [])

  React.useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev
      localStorage.setItem('sidebar-collapsed', next ? '1' : '0')
      return next
    })
  }

  const role: UserRole = (mounted && user?.role) || 'USER'
  const navGroups = NAV_BY_ROLE[role]
  const badge = ROLE_BADGE[role]
  const displayName = mounted ? user?.name : ''
  const displayEmail = mounted ? user?.email : ''
  const initials = mounted && user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'

  const isActiveLink = (href: string) =>
    mounted && (pathname === href || pathname.startsWith(href + '/'))

  const SidebarContent = ({ collapsed }: { collapsed: boolean }) => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 h-16 border-b border-slate-100 shrink-0">
        <Link href="/" className={cn('flex items-center gap-2', collapsed && 'justify-center w-full')}>
          {collapsed ? (
            <Image
              src="/logo/sayap4.png"
              alt="Bermoela"
              width={40}
              height={40}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <Image
              src="/logo/logo_bermoela.png"
              alt="Bermoela"
              width={200}
              height={50}
              className="h-7 w-auto object-contain"
            />
          )}
        </Link>
        {!collapsed && (
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 items-center justify-center text-slate-500 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navGroups.map((group, gi) => (
          <div key={gi}>
            {group.label && !collapsed && (
              <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2">
                {group.label}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon
                const active = isActiveLink(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      'relative flex items-center gap-3 rounded-xl text-sm font-semibold transition-all',
                      collapsed ? 'justify-center px-0 py-2.5 w-11 h-11 mx-auto' : 'px-3 py-2.5',
                      active
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-sm shadow-primary-200'
                        : 'text-slate-600 hover:bg-primary-50 hover:text-primary-700',
                    )}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {active && !collapsed && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}

        {!collapsed && (
          <div className="relative mt-6 rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-4 text-white overflow-hidden">
            <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-amber-400/25 rounded-full blur-2xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[9px] font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-2.5 h-2.5" />
                Baru
              </div>
              <p className="text-sm font-bold leading-tight mb-2">Coba Tes Gratis</p>
              <p className="text-[11px] text-primary-100/90 leading-relaxed mb-3">
                Rasakan pengalaman psikotes tanpa biaya.
              </p>
              <Link
                href="/gratis"
                className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg bg-white text-primary-700 text-[11px] font-bold hover:bg-amber-50 transition-colors"
              >
                Mulai Sekarang
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className={cn('border-t border-slate-100 p-3 shrink-0', collapsed && 'px-2')}>
        {collapsed ? (
          <button
            onClick={toggleCollapse}
            className="w-full h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            aria-label="Expand sidebar"
          >
            <ChevronLeft className="w-4 h-4 rotate-180" />
          </button>
        ) : (
          mounted && (
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl">
              <Avatar className="w-9 h-9 rounded-full border border-white shadow-sm">
                <AvatarFallback className="rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white text-xs font-black">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate leading-tight">
                  {displayName?.split(' ')[0] || 'Pengguna'}
                </p>
                <p className="text-[10px] text-slate-500 truncate">{displayEmail}</p>
              </div>
              <button
                onClick={() => logoutMutation.mutate()}
                className="w-8 h-8 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors"
                title="Keluar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary-100 selection:text-primary-900">
      <aside
        className={cn(
          'hidden lg:flex fixed inset-y-0 left-0 z-40 bg-white border-r border-slate-100 transition-[width] duration-200',
          isCollapsed ? 'w-[76px]' : 'w-[260px]',
        )}
      >
        <SidebarContent collapsed={isCollapsed} />
      </aside>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <aside
        className={cn(
          'lg:hidden fixed inset-y-0 left-0 z-50 w-[280px] bg-white border-r border-slate-100 transition-transform duration-200',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <SidebarContent collapsed={false} />
      </aside>

      <div
        className={cn(
          'transition-[padding] duration-200',
          isCollapsed ? 'lg:pl-[76px]' : 'lg:pl-[260px]',
        )}
      >
        <header
          className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-slate-100"
          suppressHydrationWarning
        >
          <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors shrink-0"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link
                href="/"
                className="h-9 px-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 hover:bg-primary-50 hover:border-primary-100 hover:text-primary-700 transition-colors inline-flex items-center gap-1.5 shrink-0"
                title="Ke halaman utama"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-bold">Beranda</span>
              </Link>

              <Breadcrumbs pathname={mounted ? pathname : ''} />
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 h-10 px-3 rounded-xl bg-slate-50 border border-slate-100 w-60">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari tes, paket..."
                  className="bg-transparent text-sm font-medium outline-none w-full placeholder:text-slate-400"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-xl text-slate-500 hover:bg-primary-50 hover:text-primary-700"
                asChild
              >
                <Link href="/admin/notifications">
                  <Bell className="w-5 h-5" />
                </Link>
              </Button>

              {mounted && (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-1 pr-3 rounded-full border border-slate-100 bg-slate-50 hover:bg-primary-50 hover:border-primary-100 transition-all outline-none">
                      <Avatar className="w-8 h-8 rounded-full border border-white shadow-sm">
                        <AvatarFallback className="rounded-full bg-gradient-to-br from-primary-600 to-primary-700 text-white text-[10px] font-black">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline text-xs font-bold text-slate-700">
                        {displayName?.split(' ')[0] || 'Akun'}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-60 rounded-2xl p-2 mt-2 shadow-2xl border-slate-100"
                    align="end"
                  >
                    <DropdownMenuLabel className="px-3 py-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Akun Saya
                      </p>
                      <p className="text-sm font-bold text-slate-900 truncate">{displayEmail}</p>
                      <Badge
                        className={cn(
                          'mt-2 text-[9px] font-black uppercase tracking-widest',
                          badge.className,
                        )}
                      >
                        {badge.label}
                      </Badge>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="rounded-xl py-2.5 px-3 cursor-pointer font-semibold text-slate-600 focus:bg-primary-50 focus:text-primary-700"
                      asChild
                    >
                      <Link href="/pengguna/profil">Profil Lengkap</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-xl py-2.5 px-3 cursor-pointer font-semibold text-slate-600 focus:bg-primary-50 focus:text-primary-700"
                      asChild
                    >
                      <Link href="/pengguna/paket-saya">Paket Saya</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="rounded-xl py-2.5 px-3 cursor-pointer text-red-500 font-bold focus:bg-red-50 focus:text-red-600 flex items-center gap-2"
                      onClick={() => logoutMutation.mutate()}
                    >
                      <LogOut className="w-4 h-4" /> Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">{children}</main>

        <footer className="max-w-7xl mx-auto px-8 py-10 border-t border-slate-200/50 text-slate-400">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              © 2026 Bermoela — Indonesian Life School
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="#"
                className="text-[10px] font-black hover:text-slate-900 transition-colors uppercase tracking-widest"
              >
                Bantuan
              </Link>
              <Link
                href="#"
                className="text-[10px] font-black hover:text-slate-900 transition-colors uppercase tracking-widest"
              >
                Kebijakan
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

function Breadcrumbs({ pathname }: { pathname: string }) {
  const crumbs = React.useMemo(() => buildBreadcrumbs(pathname), [pathname])

  if (crumbs.length === 0) {
    return (
      <nav aria-label="breadcrumb" className="hidden md:flex items-center gap-1.5 min-w-0">
        <span className="text-sm font-bold text-slate-900">Dashboard</span>
      </nav>
    )
  }

  return (
    <nav
      aria-label="breadcrumb"
      className="hidden md:flex items-center gap-1.5 min-w-0 overflow-hidden"
    >
      <Link
        href="/dashboard"
        className="text-xs font-bold text-slate-500 hover:text-primary-700 transition-colors whitespace-nowrap"
      >
        Dashboard
      </Link>
      {crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <React.Fragment key={c.href}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            {isLast ? (
              <span
                aria-current="page"
                className="text-sm font-black text-slate-900 truncate"
                title={c.label}
              >
                {c.label}
              </span>
            ) : (
              <Link
                href={c.href}
                className="text-xs font-bold text-slate-500 hover:text-primary-700 transition-colors whitespace-nowrap truncate"
              >
                {c.label}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
