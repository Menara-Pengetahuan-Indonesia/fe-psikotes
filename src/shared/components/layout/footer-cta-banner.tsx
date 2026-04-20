import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type FooterCtaBannerProps = {
  cta: {
    title: string
    desc: string
    href: string
    label: string
  }
  theme: {
    textMuted: string
    ctaButton: string
  }
}

export function FooterCtaBanner({
  cta,
  theme,
}: FooterCtaBannerProps) {
  return (
    <div
      className={cn(
        'rounded-2xl md:rounded-3xl p-6 md:p-8',
        'bg-white/5 backdrop-blur-sm',
        'border border-white/10',
        'flex flex-col sm:flex-row items-center',
        'justify-between gap-4',
      )}
    >
      <div>
        <h3
          className={cn(
            'text-lg md:text-xl font-bold',
            'text-white',
          )}
        >
          {cta.title}
        </h3>
        <p className={cn('text-sm mt-1', theme.textMuted)}>
          {cta.desc}
        </p>
      </div>
      <Link
        href={cta.href}
        className={cn(
          'inline-flex items-center gap-2',
          'px-6 py-3 rounded-full',
          'font-bold text-sm',
          'transition-colors shrink-0',
          theme.ctaButton,
        )}
      >
        {cta.label}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
