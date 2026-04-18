'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  History,
  UserCircle,
  Home,
  LogOut,
  ChevronsUpDown,
} from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useAuthStoreHydrated } from '@/store/auth.store'
import { useLogout } from '@/features/auth/hooks'
import { cn } from '@/lib/utils'
import type { NavItem } from '../types'

const NAV_ITEMS: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dasbor',
    icon: LayoutDashboard,
  },
  {
    href: '/pengguna/tes',
    label: 'Tes Saya',
    icon: FileText,
  },
  {
    href: '/pengguna/riwayat',
    label: 'Riwayat Hasil',
    icon: History,
  },
  {
    href: '/dashboard/profil',
    label: 'Profil',
    icon: UserCircle,
  },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>,
) {
  const pathname = usePathname()
  const { user } = useAuthStoreHydrated()
  const logoutMutation = useLogout()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-6 border-b border-white/5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-transparent"
            >
              <Link href="/">
                <Image
                  src="/logo/logo_bermoela.png"
                  alt="Bermoela"
                  width={44}
                  height={44}
                  className="aspect-square size-11 object-contain transform transition-transform group-hover:scale-105"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="p-4 pt-8">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                    className={cn(
                      "transition-colors duration-300 py-6 px-5 rounded-2xl group/btn overflow-hidden relative",
                      isActive 
                        ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-4 z-10">
                      <item.icon className={cn("size-5 transition-transform group-hover/btn:scale-110", isActive ? "text-white" : "text-slate-500 group-hover:text-primary-400")} />
                      <span className="font-bold tracking-tight">{item.label}</span>
                      {isActive && (
                        <div className="absolute right-0 top-0 h-full w-1 bg-white/20 blur-[1px]" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-white/5 bg-slate-900/40 backdrop-blur-sm">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="rounded-2xl hover:bg-white/5 group transition-colors p-4 h-16"
                >
                  <Avatar className="size-10 rounded-xl border-2 border-white/10 shadow-lg shadow-black/20">
                    <AvatarFallback className="rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 text-white font-black text-sm">
                      {user?.name
                        ? getInitials(user.name)
                        : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight ml-3">
                    <span className="truncate font-bold text-white tracking-tight">
                      {user?.name || 'Pengguna'}
                    </span>
                    <span className="truncate text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                      Basic Member
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-slate-600 transition-colors group-hover:text-primary-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 rounded-3xl bg-slate-900 border-white/5 text-white shadow-2xl p-2 mb-4"
                side="top"
                align="end"
                sideOffset={12}
              >
                <DropdownMenuLabel className="p-4 font-normal">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-xl bg-primary-600/20 flex items-center justify-center border border-primary-500/30">
                      <span className="text-primary-400 font-black text-xs">{user?.name ? getInitials(user.name) : 'U'}</span>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-bold text-white tracking-tight leading-none">
                        {user?.name || 'Pengguna'}
                      </span>
                      <span className="truncate text-[10px] text-slate-500 mt-1 uppercase tracking-[0.1em]">
                        {user?.email || ''}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                <div className="p-1 space-y-1">
                  <DropdownMenuItem
                    className="cursor-pointer rounded-2xl hover:bg-white/5 focus:bg-white/5 focus:text-primary-400 py-3.5 px-4 transition-colors"
                    asChild
                  >
                    <Link href="/dashboard/profil" className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-slate-800 flex items-center justify-center">
                        <UserCircle className="size-4" />
                      </div>
                      <span className="font-bold text-sm tracking-tight">Pengaturan Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer rounded-2xl hover:bg-white/5 focus:bg-white/5 focus:text-primary-400 py-3.5 px-4 transition-colors"
                    asChild
                  >
                    <Link href="/" className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-slate-800 flex items-center justify-center">
                        <Home className="size-4" />
                      </div>
                      <span className="font-bold text-sm tracking-tight">Kembali ke Beranda</span>
                    </Link>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem
                  className="cursor-pointer rounded-2xl text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400 py-3.5 px-4 mt-1 transition-colors"
                  onClick={() =>
                    logoutMutation.mutate()
                  }
                  disabled={logoutMutation.isPending}
                >
                  <div className="size-8 rounded-lg bg-red-500/10 flex items-center justify-center mr-3">
                    <LogOut className="size-4" />
                  </div>
                  <span className="font-black text-sm uppercase tracking-wider">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
