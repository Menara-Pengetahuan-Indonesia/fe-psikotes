import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ICON_MAP, type NavItem } from './navbar-constants'

interface NavbarMobileMenuProps {
  navItems: NavItem[]
  onClose: () => void
}

export function NavbarMobileMenu({
  navItems,
  onClose,
}: NavbarMobileMenuProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-40 bg-white/95',
        'backdrop-blur-xl pt-24 px-6 md:hidden',
        'animate-in fade-in slide-in-from-top-10',
        'duration-300'
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-4 overflow-y-auto',
          'max-h-[calc(100vh-100px)]'
        )}
      >
        {navItems.map((item, idx) => (
          <div
            key={idx}
            className="border-b border-slate-100 pb-2"
          >
            {item.children ? (
              <MobileDropdownSection
                item={item}
                onClose={onClose}
              />
            ) : (
              <Link
                href={item.href || '#'}
                onClick={onClose}
                className={cn(
                  'block text-lg font-semibold',
                  'text-slate-800 py-2 cursor-pointer'
                )}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-3 mt-6 pb-10">
          <Button
            variant="outline"
            className={cn(
              'w-full rounded-full',
              'border-slate-200 cursor-pointer'
            )}
            asChild
          >
            <Link href="/masuk">Masuk</Link>
          </Button>
          <Button
            className={cn(
              'w-full rounded-full cursor-pointer',
              'bg-primary-600 hover:bg-primary-700'
            )}
            asChild
          >
            <Link href="/daftar">Daftar Sekarang</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ---- internal ---- */

function MobileDropdownSection({
  item,
  onClose,
}: {
  item: NavItem
  onClose: () => void
}) {
  return (
    <>
      <p
        className={cn(
          'text-xs font-bold text-slate-400',
          'uppercase tracking-wider mb-2 mt-2'
        )}
      >
        {item.label}
      </p>
      <div className="flex flex-col gap-1 pl-1">
        {item.children?.map((child) => {
          const Icon = child.icon
            ? ICON_MAP[child.icon]
            : undefined
          return (
            <Link
              key={child.label}
              href={child.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3',
                'rounded-xl p-2.5 cursor-pointer',
                'hover:bg-primary-50 group',
                'transition-colors'
              )}
            >
              {Icon && (
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0',
                    'items-center justify-center',
                    'rounded-xl bg-slate-100',
                    'group-hover:bg-primary-100',
                    'transition-colors'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 text-slate-500',
                      'group-hover:text-primary-600',
                      'transition-colors'
                    )}
                  />
                </div>
              )}
              <div className="flex flex-col">
                <span
                  className={cn(
                    'text-sm font-semibold',
                    'text-slate-700',
                    'group-hover:text-primary-700'
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
          )
        })}
      </div>
    </>
  )
}
