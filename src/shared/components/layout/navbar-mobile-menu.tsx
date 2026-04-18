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
        'fixed inset-0 z-40 bg-white/98',
        'backdrop-blur-2xl pt-28 px-6 md:hidden',
        '',
        'duration-300'
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-2 overflow-y-auto',
          'max-h-[calc(100vh-120px)]'
        )}
      >
        {navItems.map((item, idx) => (
          <div key={idx}>
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
                  'block text-base font-semibold',
                  'text-slate-700 py-3 px-3 rounded-2xl',
                  'hover:bg-primary-50/60 hover:text-primary-700',
                  'transition-colors cursor-pointer'
                )}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-3 mt-8 pb-10">
          <Button
            variant="outline"
            className={cn(
              'w-full h-12 rounded-2xl text-[13px] font-semibold',
              'border-slate-200 text-slate-600',
              'hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700',
              'transition-colors cursor-pointer'
            )}
            asChild
          >
            <Link href="/masuk">Masuk</Link>
          </Button>
          <Button
            className={cn(
              'w-full h-12 rounded-2xl text-[13px] font-semibold',
              'bg-primary-600 hover:bg-primary-700 text-white',
              'shadow-lg shadow-primary-600/20',
              'transition-colors cursor-pointer'
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
    <div className="py-2">
      <p
        className={cn(
          'text-[10px] font-bold text-slate-400',
          'uppercase tracking-[0.15em] mb-2 px-3'
        )}
      >
        {item.label}
      </p>
      <div className="flex flex-col gap-0.5">
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
                'flex items-center gap-3.5',
                'rounded-2xl p-3 cursor-pointer',
                'hover:bg-primary-50/60 group',
                'transition-colors duration-200'
              )}
            >
              {Icon && (
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0',
                    'items-center justify-center',
                    'rounded-xl bg-slate-50',
                    'group-hover:bg-primary-100',
                    'group-hover:shadow-sm',
                    'transition-colors duration-200'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-[18px] w-[18px] text-slate-400',
                      'group-hover:text-primary-600',
                      'transition-colors duration-200'
                    )}
                  />
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <span
                  className={cn(
                    'text-[13px] font-semibold',
                    'text-slate-700',
                    'group-hover:text-primary-700',
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
  )
}
