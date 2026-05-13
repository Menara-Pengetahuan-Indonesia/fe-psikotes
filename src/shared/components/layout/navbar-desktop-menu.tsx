'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ICON_MAP, type NavItem } from './navbar-constants'

interface NavbarDesktopMenuProps {
  navItems: NavItem[]
  pathname: string
  isScrolled?: boolean
}

export function NavbarDesktopMenu({
  navItems,
  pathname,
}: NavbarDesktopMenuProps) {
  return (
    <div className="hidden md:flex items-center gap-0.5">
      {navItems.map((item, idx) => {
        if (item.children) {
          return <DesktopDropdown key={idx} item={item} pathname={pathname} />
        }

        const isActive = pathname === item.href
        return (
          <Link
            key={item.href || idx}
            href={item.href || '#'}
            className={cn(
              'px-4 py-2 rounded-full text-[13px] whitespace-nowrap',
              'font-bold tracking-wide transition-colors duration-300',
              'cursor-pointer',
              isActive
                ? 'bg-primary-600 text-white font-black shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}

export function NavbarDesktopCta() {
  return (
    <div className="hidden md:flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'rounded-full text-[13px] font-semibold tracking-wide',
          'transition-colors cursor-pointer',
          'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
        )}
        asChild
      >
        <Link href="/masuk">Masuk</Link>
      </Button>
      <Button
        size="sm"
        className={cn(
          'rounded-full text-[13px] font-bold tracking-wide',
          'shadow-md hover:shadow-lg transition-colors cursor-pointer',
          'bg-primary-600 hover:bg-primary-700 text-white',
        )}
        asChild
      >
        <Link href="/daftar">Daftar</Link>
      </Button>
    </div>
  )
}

function DesktopDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  const hasActiveChild = item.children?.some(
    (c) => pathname === c.href || pathname.startsWith(c.href + '/'),
  )

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          'flex items-center gap-1.5 px-4 py-2',
          'rounded-full text-[13px] font-bold tracking-wide whitespace-nowrap',
          'outline-none transition-colors cursor-pointer',
          hasActiveChild
            ? 'bg-primary-600 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            'w-3 h-3 transition-transform duration-200',
            open ? 'rotate-180' : '',
            hasActiveChild ? 'opacity-80' : 'opacity-50',
          )}
        />
      </button>

      <div
        className={cn(
          'absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[9999]',
          'transition-all duration-200 ease-out',
          open
            ? 'opacity-100 visible translate-y-0 pointer-events-auto'
            : 'opacity-0 invisible translate-y-2 pointer-events-none',
        )}
      >
        <div
          className={cn(
            'w-80 rounded-3xl p-3',
            'bg-white',
            'border border-slate-100 shadow-2xl shadow-slate-900/10',
            'ring-1 ring-black/[0.04]',
          )}
          role="menu"
        >
          <div className="space-y-0.5">
            {item.children?.map((child) => {
              const Icon = child.icon ? ICON_MAP[child.icon] : undefined
              const isActive =
                pathname === child.href || pathname.startsWith(child.href + '/')
              return (
                <Link
                  key={child.label}
                  href={child.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3.5',
                    'cursor-pointer rounded-2xl p-3',
                    'transition-colors duration-200 group/item',
                    isActive ? 'bg-primary-50' : 'hover:bg-primary-50/60',
                  )}
                >
                  {Icon && (
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200',
                        isActive
                          ? 'bg-primary-100 shadow-sm'
                          : 'bg-slate-50 group-hover/item:bg-primary-100 group-hover/item:shadow-sm',
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-[18px] w-[18px] transition-colors duration-200',
                          isActive
                            ? 'text-primary-600'
                            : 'text-slate-400 group-hover/item:text-primary-600',
                        )}
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={cn(
                        'text-[13px] font-semibold transition-colors duration-200',
                        isActive
                          ? 'text-primary-700'
                          : 'text-slate-700 group-hover/item:text-primary-700',
                      )}
                    >
                      {child.label}
                    </span>
                    {child.desc && (
                      <span className="text-[11px] text-slate-400 leading-snug font-medium">
                        {child.desc}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
