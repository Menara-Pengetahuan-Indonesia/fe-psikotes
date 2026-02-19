'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  psikotesNavItems,
  konselingNavItems,
  pelatihanNavItems,
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
    if (pathname.startsWith('/konseling'))
      return konselingNavItems
    if (pathname.startsWith('/pelatihan'))
      return pelatihanNavItems
    return psikotesNavItems
  }, [customNavItems, pathname])

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () =>
      window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHiddenRoute =
    (HIDDEN_ROUTES as readonly string[]).includes(
      pathname
    ) ||
    HIDDEN_ROUTE_PREFIXES.some((p) =>
      pathname.startsWith(p)
    )
  if (isHiddenRoute) return null

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'flex justify-center transition-all',
          'duration-500 ease-in-out px-4 md:px-8',
          isScrolled ? 'pt-4' : 'pt-6'
        )}
      >
        <nav
          className={cn(
            'w-full max-w-6xl flex items-center',
            'justify-between px-6 py-3',
            'transition-all duration-500',
            isScrolled
              ? cn(
                'bg-white/90 backdrop-blur-md',
                'rounded-full shadow-lg',
                'border border-white/40'
              )
              : cn(
                'bg-transparent rounded-full',
                'border-transparent'
              )
          )}
        >
          <NavbarLogo isScrolled={isScrolled} />

          <NavbarDesktopMenu
            navItems={navItems}
            pathname={pathname}
            isScrolled={isScrolled}
          />

          <div className="flex items-center gap-3 ml-auto">
            <NavbarDesktopCta isScrolled={isScrolled} />

            <button
              className={cn(
                'md:hidden p-2 rounded-full',
                'hover:bg-slate-50 text-slate-700',
                'cursor-pointer'
              )}
              onClick={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
            >
              {isMobileMenuOpen
                ? <X size={20} />
                : <Menu size={20} />}
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
