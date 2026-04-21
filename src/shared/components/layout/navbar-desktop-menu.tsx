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
          return (
            <DesktopDropdown
              key={idx}
              item={item}
            />
          )
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
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
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
          'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
          'bg-primary-600 hover:bg-primary-700 text-white'
        )}
        asChild
      >
        <Link href="/daftar">Daftar</Link>
      </Button>
    </div>
  )
}

/* ---- internal ---- */

function DesktopDropdown({
  item,
}: {
  item: NavItem
}) {
  return (
    <div className="relative group">
      <Link
        href={item.href || '#'}
        className={cn(
          'flex items-center gap-1.5 px-4 py-2',
          'rounded-full text-[13px] font-bold tracking-wide whitespace-nowrap',
          'outline-none transition-colors cursor-pointer',
          'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        )}
      >
        {item.label}
        <ChevronDown className="w-3 h-3 opacity-40 transition-transform duration-300 group-hover:rotate-180" />
      </Link>
      <div className={cn(
        'absolute top-full left-1/2 -translate-x-1/2 pt-3',
        'opacity-0 invisible translate-y-2',
        'group-hover:opacity-100 group-hover:visible group-hover:translate-y-0',
        'transition-colors duration-300 ease-out',
        'z-[9999]'
      )}>
        <div className={cn(
          'w-80 rounded-3xl p-3',
          'bg-white',
          'border border-slate-100 shadow-2xl shadow-slate-900/10',
          'ring-1 ring-black/[0.04]'
        )}>
          <div className="space-y-0.5">
            {item.children?.map((child) => {
              const Icon = child.icon
                ? ICON_MAP[child.icon]
                : undefined
              return (
                <Link
                  key={child.label}
                  href={child.href}
                  className={cn(
                    'flex items-center gap-3.5',
                    'cursor-pointer rounded-2xl p-3',
                    'transition-colors duration-200',
                    'hover:bg-primary-50/60 group/item'
                  )}
                >
                  {Icon && (
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0',
                        'items-center justify-center',
                        'rounded-xl bg-slate-50',
                        'transition-colors duration-200',
                        'group-hover/item:bg-primary-100',
                        'group-hover/item:shadow-sm'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-[18px] w-[18px] text-slate-400',
                          'transition-colors duration-200',
                          'group-hover/item:text-primary-600'
                        )}
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={cn(
                        'text-[13px] font-semibold',
                        'text-slate-700',
                        'group-hover/item:text-primary-700',
                        'transition-colors duration-200'
                      )}
                    >
                      {child.label}
                    </span>
                    {child.desc && (
                      <span
                        className={cn(
                          'text-[11px] text-slate-400',
                          'leading-snug font-medium'
                        )}
                      >
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
