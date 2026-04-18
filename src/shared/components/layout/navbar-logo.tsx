import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavbarLogoProps {
  isScrolled: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NavbarLogo(_props: NavbarLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 group mr-8">
      <Image
        src="/logo/logo_bermoela.png"
        alt="Bermoela"
        width={40}
        height={40}
        className={cn(
          'w-10 h-10 object-contain',
          'group-hover:scale-110 transition-transform duration-300'
        )}
      />
      <span className="text-[15px] font-black tracking-tight text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
        bermoela
      </span>
    </Link>
  )
}
