'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  psikotesNavItems,
} from '@/config/navigation'
import {
  HIDDEN_ROUTES,
  HIDDEN_ROUTE_PREFIXES,
  type NavItem,
} from './navbar-constants'
import { NavbarLogo } from './navbar-logo'
import {
  NavbarDesktopMenu,
  NavbarDesktopCta,
} from './navbar-desktop-menu'
import { NavbarMobileMenu } from './navbar-mobile-menu'

export type { NavItem, NavChildItem } from './navbar-constants'

interface NavbarProps {
  navItems?: NavItem[]
}

export function Navbar({
  navItems: customNavItems,
}: NavbarProps = {}) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    React.useState(false)
  const pathname = usePathname()

  const navItems = React.useMemo(() => {
    if (customNavItems) return customNavItems
    return psikotesNavItems
  }, [customNavItems])

  React.useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })
    return () =>
      window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHiddenRoute =
    (HIDDEN_ROUTES as readonly string[]).includes(
      pathname
    ) ||
    HIDDEN_ROUTE_PREFIXES.some((p) =>
      pathname.startsWith(p)
    ) ||
    pathname.startsWith('/mahasiswa/try-out/form') ||
    pathname.startsWith('/tes/')
  if (isHiddenRoute) return null

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'flex justify-center transition-all',
          'duration-500 ease-out px-4 md:px-8',
          isScrolled ? 'pt-3' : 'pt-5'
        )}
      >
        <nav
          className={cn(
            'w-full max-w-6xl flex items-center',
            'justify-between px-5 py-2.5',
            'transition-all duration-500 ease-out',
            'bg-white rounded-full',
            isScrolled
              ? 'shadow-lg shadow-slate-900/[0.06] border border-slate-100 ring-1 ring-black/[0.03]'
              : 'bg-transparent shadow-none border border-transparent'
          )}
        >
          <NavbarLogo isScrolled={isScrolled} />

          <NavbarDesktopMenu
            navItems={navItems}
            pathname={pathname}
            isScrolled={isScrolled}
          />

          <div className="flex items-center gap-2 ml-auto">
            <NavbarDesktopCta isScrolled={isScrolled} />

            <button
              className={cn(
                'md:hidden p-2.5 rounded-xl',
                'transition-all duration-200 cursor-pointer',
                isScrolled
                  ? 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
              onClick={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
            >
              {isMobileMenuOpen
                ? <X size={20} strokeWidth={2.5} />
                : <Menu size={20} strokeWidth={2.5} />}
            </button>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <NavbarMobileMenu
          navItems={navItems}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
