'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { psikotesNavItems, konselingNavItems, pelatihanNavItems } from '@/config/navigation'

// Define types locally if not exported from config
export type NavItem = {
  label: string
  href?: string
  children?: { label: string; href: string }[]
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', href: '/psikotes' },
  {
    label: 'Layanan',
    children: [
      { label: 'Psikotes', href: '/psikotes' },
      { label: 'Konseling', href: '/konseling' },
      { label: 'Pelatihan', href: '/pelatihan' },
    ]
  },
  {
    label: 'Kategori',
    children: [
      { label: 'Mahasiswa', href: '/psikotes/mahasiswa' },
      { label: 'Perusahaan', href: '/psikotes/perusahaan' },
      { label: 'Kesehatan Mental', href: '/psikotes/kesehatan-mental' },
    ]
  },
  {
    label: 'Jenis Tes',
    children: [
      { label: 'Gratis', href: '/psikotes/gratis' },
      { label: 'Premium', href: '/psikotes/premium' },
    ]
  },
]

interface NavbarProps {
  navItems?: NavItem[]
}

export function Navbar({ navItems: customNavItems }: NavbarProps = {}) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  // Use custom navItems if provided, otherwise use DEFAULT_NAV_ITEMS
  const navItems = customNavItems || DEFAULT_NAV_ITEMS

  // Handle Scroll Effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide Navbar on Homepage
  if (pathname === '/') return null

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
                  <DropdownMenu key={idx}>
                    <DropdownMenuTrigger className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium outline-none transition-all",
                      isScrolled ? "text-slate-600 hover:bg-slate-50 hover:text-slate-900" : "text-white/90 hover:bg-white/10 hover:text-white"
                    )}>
                      {item.label} <ChevronDown className="w-3 h-3 opacity-50" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 bg-white/95 backdrop-blur-xl border-slate-100 shadow-xl rounded-xl p-2">
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.href} asChild>
                          <Link href={child.href} className="cursor-pointer font-medium text-slate-600 focus:text-emerald-600 focus:bg-emerald-50 rounded-lg">
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
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
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
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
              href="/membership"
              className={cn(
                'px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ml-2',
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
                "rounded-full transition-all",
                isScrolled ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50" : "text-white hover:text-white hover:bg-white/10"
              )} asChild>
                <Link href="/masuk">Masuk</Link>
              </Button>
              <Button size="sm" className={cn(
                "rounded-full font-bold shadow-md hover:shadow-lg transition-all",
                isScrolled 
                  ? "bg-secondary hover:bg-secondary/90 text-white" 
                  : "bg-white hover:bg-emerald-50 text-emerald-700"
              )} asChild>
                <Link href="/daftar">Daftar</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-slate-50 text-slate-700"
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
                    <div className="flex flex-col gap-2 pl-4">
                      {item.children.map((child) => (
                        <Link 
                          key={child.href} 
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-base font-semibold text-slate-700 py-1"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || '#'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-semibold text-slate-800 py-2"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-3 mt-6 pb-10">
              <Button variant="outline" className="w-full rounded-full border-slate-200" asChild>
                <Link href="/masuk">Masuk</Link>
              </Button>
              <Button className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700" asChild>
                <Link href="/daftar">Daftar Sekarang</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
