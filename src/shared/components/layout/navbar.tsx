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
    setIsScrolled(window.scrollY > 20)
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
          'sticky top-0 w-full transition-colors duration-500 ease-out',
          isScrolled
            ? 'z-50 flex justify-center px-4 md:px-8 py-3'
            : 'z-50 bg-white'
        )}
      >
        <nav
          className={cn(
            'grid grid-cols-3 items-center px-6 py-3',
            'transition-colors duration-500 ease-out',
            isScrolled
              ? 'w-full max-w-6xl rounded-full bg-white/95 backdrop-blur-xl shadow-md shadow-gray-900/[0.06] border border-gray-200/50'
              : 'w-full max-w-7xl mx-auto'
          )}
        >
          {/* Left: Logo */}
          <div className="flex items-center">
            <NavbarLogo isScrolled={isScrolled} />
          </div>

          {/* Center: Nav links */}
          <div className="flex justify-center">
            <NavbarDesktopMenu
              navItems={navItems}
              pathname={pathname}
              isScrolled={isScrolled}
            />
          </div>

          {/* Right: CTA + mobile toggle */}
          <div className="flex items-center justify-end gap-2">
            <NavbarDesktopCta isScrolled={isScrolled} />
            <button
              className={cn(
                'md:hidden p-2.5 rounded-xl',
                'transition-colors duration-200 cursor-pointer',
                'text-primary-500 hover:bg-primary-50 hover:text-primary-700'
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
