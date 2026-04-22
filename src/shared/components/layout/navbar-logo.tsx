import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavbarLogoProps {
  isScrolled: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NavbarLogo(_props: NavbarLogoProps) {
  return (
    <Link href="/" className="flex items-center group mr-8">
      <Image
        src="/logo/logo_bermoela.png"
        alt="Bermoela"
        width={200}
        height={50}
        className={cn(
          'h-10 w-auto object-contain',
          'group-hover:scale-110 transition-transform duration-300'
        )}
      />
    </Link>
  )
}
