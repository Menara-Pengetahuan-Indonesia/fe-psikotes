import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ICON_MAP, type NavItem } from './navbar-constants'

interface NavbarDesktopMenuProps {
  navItems: NavItem[]
  pathname: string
  isScrolled: boolean
}

export function NavbarDesktopMenu({
  navItems,
  pathname,
  isScrolled,
}: NavbarDesktopMenuProps) {
  return (
    <div className="hidden md:flex items-center gap-1">
      {navItems.map((item, idx) => {
        if (item.children) {
          return (
            <DesktopDropdown
              key={idx}
              item={item}
              isScrolled={isScrolled}
            />
          )
        }

        const isActive = pathname === item.href
        return (
          <Link
            key={item.href || idx}
            href={item.href || '#'}
            className={cn(
              'px-4 py-2 rounded-full text-sm',
              'font-medium transition-all duration-300',
              'cursor-pointer',
              isActive
                ? isScrolled
                  ? 'bg-primary-50 text-primary-700 shadow-sm'
                  : 'bg-white/20 text-white shadow-sm'
                : isScrolled
                  ? cn(
                    'text-slate-600',
                    'hover:bg-slate-50 hover:text-slate-900'
                  )
                  : cn(
                    'text-white/80',
                    'hover:bg-white/10 hover:text-white'
                  )
            )}
          >
            {item.label}
          </Link>
        )
      })}

      <Link
        href="/pengguna"
        className={cn(
          'px-4 py-2 rounded-full text-sm font-bold',
          'transition-all duration-300 ml-2 cursor-pointer',
          'bg-purple-900 hover:bg-purple-800',
          'text-white shadow-md hover:shadow-lg'
        )}
      >
        Paid Member
      </Link>
    </div>
  )
}

export function NavbarDesktopCta({
  isScrolled,
}: {
  isScrolled: boolean
}) {
  return (
    <div className="hidden md:flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'rounded-full transition-all cursor-pointer',
          isScrolled
            ? cn(
              'text-slate-600',
              'hover:text-slate-900 hover:bg-slate-50'
            )
            : cn(
              'text-white hover:text-white',
              'hover:bg-white/10'
            )
        )}
        asChild
      >
        <Link href="/masuk">Masuk</Link>
      </Button>
      <Button
        size="sm"
        className={cn(
          'rounded-full font-bold shadow-md',
          'hover:shadow-lg transition-all cursor-pointer',
          isScrolled
            ? 'bg-secondary hover:bg-secondary/90 text-white'
            : cn(
              'bg-white hover:bg-primary-50',
              'text-primary-700'
            )
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
  isScrolled,
}: {
  item: NavItem
  isScrolled: boolean
}) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={cn(
          'flex items-center gap-1 px-4 py-2',
          'rounded-full text-sm font-medium',
          'outline-none transition-all cursor-pointer',
          isScrolled
            ? cn(
              'text-slate-600',
              'hover:bg-slate-50 hover:text-slate-900'
            )
            : cn(
              'text-white/90',
              'hover:bg-white/10 hover:text-white'
            )
        )}
      >
        {item.label}
        <ChevronDown className="w-3 h-3 opacity-50" />
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
          {item.children?.map((child) => {
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
                    'focus:bg-primary-50',
                    'hover:bg-primary-50 group'
                  )}
                >
                  {Icon && (
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0',
                        'items-center justify-center',
                        'rounded-xl bg-slate-100',
                        'transition-colors duration-150',
                        'group-hover:bg-primary-100',
                        'group-focus:bg-primary-100'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-5 w-5 text-slate-500',
                          'transition-colors duration-150',
                          'group-hover:text-primary-600',
                          'group-focus:text-primary-600'
                        )}
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        'text-sm font-semibold',
                        'text-slate-700',
                        'group-hover:text-primary-700',
                        'group-focus:text-primary-700'
                      )}
                    >
                      {child.label}
                    </span>
                    {child.desc && (
                      <span
                        className={cn(
                          'text-xs text-slate-400',
                          'leading-snug'
                        )}
                      >
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
