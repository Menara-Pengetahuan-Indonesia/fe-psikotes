import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavbarLogoProps {
  isScrolled: boolean
}

export function NavbarLogo({ isScrolled }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group mr-8"
    >
      <div
        className={cn(
          'w-8 h-8 bg-primary-500 rounded-lg',
          'flex items-center justify-center',
          'text-white font-black text-xs shadow-md',
          'group-hover:rotate-12 transition-transform',
          'duration-300'
        )}
      >
        B
      </div>
      <span
        className={cn(
          'font-bold text-lg tracking-tight',
          'transition-colors duration-500',
          isScrolled ? 'text-slate-800' : 'text-white'
        )}
      >
        BER
        <span
          className={cn(
            isScrolled
              ? 'text-primary-600'
              : 'text-primary-400'
          )}
        >
          MOELA
        </span>
      </span>
    </Link>
  )
}
