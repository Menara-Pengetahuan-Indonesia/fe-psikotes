import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavbarLogoProps {
  isScrolled: boolean
}

export function NavbarLogo({ isScrolled: _isScrolled }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center group mr-8"
    >
      <Image
        src="/logo/logo_bermoela.png"
        alt="Bermoela"
        width={48}
        height={48}
        className={cn(
          'w-12 h-12 object-contain',
          'group-hover:scale-110 transition-transform',
          'duration-300'
        )}
      />
    </Link>
  )
}
