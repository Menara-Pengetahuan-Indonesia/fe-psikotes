'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Menu,
  X,
  ChevronDown,
  Brain,
  Heart,
  GraduationCap,
  BookOpen,
  Building2,
  HeartPulse,
  Gift,
  Crown,
  Users,
  HeartHandshake,
  Presentation,
  Video,
  Monitor,
  Compass,
  type LucideIcon,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  psikotesNavItems,
  konselingNavItems,
  pelatihanNavItems,
} from '@/config/navigation'

export type NavChildItem = {
  label: string
  href: string
  icon?: string
  desc?: string
}

export type NavItem = {
  label: string
  href?: string
  children?: NavChildItem[]
}

const ICON_MAP: Record<string, LucideIcon> = {
  Brain,
  Heart,
  GraduationCap,
  BookOpen,
  Building2,
  HeartPulse,
  Gift,
  Crown,
  Users,
  HeartHandshake,
  Presentation,
  Video,
  Monitor,
  Compass,
}


interface NavbarProps {
  navItems?: NavItem[]
}

export function Navbar({ navItems: customNavItems }: NavbarProps = {}) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  // Auto-detect navItems based on route
  const navItems = React.useMemo(() => {
    if (customNavItems) return customNavItems
    if (pathname.startsWith('/konseling'))
      return konselingNavItems
    if (pathname.startsWith('/pelatihan'))
      return pelatihanNavItems
    return psikotesNavItems
  }, [customNavItems, pathname])

  // Handle Scroll Effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const hidden = pathname === '/'
    || pathname === '/masuk'
    || pathname === '/daftar'
    || pathname === '/forgot-password'
    || pathname.startsWith('/pengguna')
    || pathname.startsWith('/admin')
    || pathname.startsWith('/perusahaan')
  if (hidden) return null

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out px-4 md:px-8',
          isScrolled ? 'pt-4' : 'pt-6'
        )}
      >
        <nav
          className={cn(
            'w-full max-w-6xl flex items-center justify-between px-6 py-3 transition-all duration-500',
            isScrolled
              ? 'bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/40' // Floating Capsule on Scroll
              : 'bg-transparent rounded-full border-transparent' // Truly Transparent on Top
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group mr-8">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-md group-hover:rotate-12 transition-transform duration-300">
              B
            </div>
            <span className={cn("font-bold text-lg tracking-tight transition-colors duration-500", isScrolled ? "text-slate-800" : "text-white")}>
              BER<span className={isScrolled ? "text-emerald-600" : "text-emerald-400"}>MOELA</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, idx) => {
              // If item has children (Dropdown)
              if (item.children) {
                return (
                  <DropdownMenu key={idx} modal={false}>
                    <DropdownMenuTrigger className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium outline-none transition-all cursor-pointer",
                      isScrolled ? "text-slate-600 hover:bg-slate-50 hover:text-slate-900" : "text-white/90 hover:bg-white/10 hover:text-white"
                    )}>
                      {item.label} <ChevronDown className="w-3 h-3 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className={cn(
                        'w-72 rounded-2xl p-2',
                        'bg-white/95 backdrop-blur-xl',
                        'border border-slate-100 shadow-xl'
                      )}
                    >
                      <div className="space-y-1">
                        {item.children.map((child) => {
                          const Icon = child.icon
                            ? ICON_MAP[child.icon]
                            : undefined
                          return (
                            <DropdownMenuItem
                              key={child.label}
                              asChild
                            >
                              <Link
                                href={child.href}
                                className={cn(
                                  'flex items-center gap-3',
                                  'cursor-pointer rounded-xl p-2.5',
                                  'transition-colors duration-150',
                                  'focus:bg-emerald-50',
                                  'hover:bg-emerald-50 group'
                                )}
                              >
                                {Icon && (
                                  <div className={cn(
                                    'flex h-10 w-10 shrink-0',
                                    'items-center justify-center',
                                    'rounded-xl bg-slate-100',
                                    'transition-colors duration-150',
                                    'group-hover:bg-emerald-100',
                                    'group-focus:bg-emerald-100'
                                  )}>
                                    <Icon className={cn(
                                      'h-5 w-5 text-slate-500',
                                      'transition-colors duration-150',
                                      'group-hover:text-emerald-600',
                                      'group-focus:text-emerald-600'
                                    )} />
                                  </div>
                                )}
                                <div className="flex flex-col">
                                  <span className={cn(
                                    'text-sm font-semibold',
                                    'text-slate-700',
                                    'group-hover:text-emerald-700',
                                    'group-focus:text-emerald-700'
                                  )}>
                                    {child.label}
                                  </span>
                                  {child.desc && (
                                    <span className={cn(
                                      'text-xs text-slate-400',
                                      'leading-snug'
                                    )}>
                                      {child.desc}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            </DropdownMenuItem>
                          )
                        })}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }

              // Simple Link
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href || idx}
                  href={item.href || '#'}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer',
                    isActive
                      ? (isScrolled ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'bg-white/20 text-white shadow-sm')
                      : (isScrolled ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900' : 'text-white/80 hover:bg-white/10 hover:text-white')
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* Paid Member Button */}
            <Link
              href="/pengguna"
              className={cn(
                'px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ml-2 cursor-pointer',
                'bg-purple-900 hover:bg-purple-800 text-white shadow-md hover:shadow-lg'
              )}
            >
              Paid Member
            </Link>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" className={cn(
                "rounded-full transition-all cursor-pointer",
                isScrolled ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50" : "text-white hover:text-white hover:bg-white/10"
              )} asChild>
                <Link href="/masuk">Masuk</Link>
              </Button>
              <Button size="sm" className={cn(
                "rounded-full font-bold shadow-md hover:shadow-lg transition-all cursor-pointer",
                isScrolled 
                  ? "bg-secondary hover:bg-secondary/90 text-white" 
                  : "bg-white hover:bg-emerald-50 text-emerald-700"
              )} asChild>
                <Link href="/daftar">Daftar</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-slate-50 text-slate-700 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden animate-in fade-in slide-in-from-top-10 duration-300">
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-100px)]">
            {navItems.map((item, idx) => (
              <div key={idx} className="border-b border-slate-100 pb-2">
                {item.children ? (
                  <>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">{item.label}</p>
                    <div className="flex flex-col gap-1 pl-1">
                      {item.children.map((child) => {
                        const Icon = child.icon
                          ? ICON_MAP[child.icon]
                          : undefined
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              'flex items-center gap-3',
                              'rounded-xl p-2.5 cursor-pointer',
                              'hover:bg-emerald-50 group',
                              'transition-colors'
                            )}
                          >
                            {Icon && (
                              <div className={cn(
                                'flex h-9 w-9 shrink-0',
                                'items-center justify-center',
                                'rounded-xl bg-slate-100',
                                'group-hover:bg-emerald-100',
                                'transition-colors'
                              )}>
                                <Icon className={cn(
                                  'h-4 w-4 text-slate-500',
                                  'group-hover:text-emerald-600',
                                  'transition-colors'
                                )} />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className={cn(
                                'text-sm font-semibold',
                                'text-slate-700',
                                'group-hover:text-emerald-700'
                              )}>
                                {child.label}
                              </span>
                              {child.desc && (
                                <span className={cn(
                                  'text-xs text-slate-400',
                                  'leading-snug'
                                )}>
                                  {child.desc}
                                </span>
                              )}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || '#'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-semibold text-slate-800 py-2 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-3 mt-6 pb-10">
              <Button variant="outline" className="w-full rounded-full border-slate-200 cursor-pointer" asChild>
                <Link href="/masuk">Masuk</Link>
              </Button>
              <Button className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 cursor-pointer" asChild>
                <Link href="/daftar">Daftar Sekarang</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
