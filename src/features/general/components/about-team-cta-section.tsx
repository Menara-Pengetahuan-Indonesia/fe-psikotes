import Link from 'next/link'
import {
  Plus,
  Diamond,
  ArrowRight,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function AboutTeamCtaSection() {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        'py-20 md:py-28',
        'bg-secondary',
      )}
    >
      <div
        className={cn(
          'absolute top-0 left-0',
          'w-80 h-80 bg-sky-400/10',
          'rounded-full -translate-x-1/2',
          '-translate-y-1/2 blur-[80px]',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute bottom-0 right-0',
          'w-80 h-80 bg-accent-400/10',
          'rounded-full translate-x-1/2',
          'translate-y-1/2 blur-[80px]',
          'pointer-events-none',
        )}
      />
      <Plus
        className={cn(
          'absolute top-[15%] right-[15%]',
          'text-white/5 w-12 h-12',
          'pointer-events-none',
        )}
      />
      <Diamond
        className={cn(
          'absolute bottom-[20%] left-[10%]',
          'text-accent-300/10 w-10 h-10',
          'rotate-12 pointer-events-none',
        )}
      />
      <div
        className={cn(
          'max-w-3xl mx-auto px-6',
          'text-center relative z-10',
          'space-y-6',
        )}
      >
        <div
          className={cn(
            'w-16 h-16 rounded-2xl',
            'bg-white/10 flex items-center',
            'justify-center mx-auto',
            'backdrop-blur-sm',
          )}
        >
          <Users
            className="w-8 h-8 text-accent-300"
          />
        </div>
        <h2
          className={cn(
            'text-3xl md:text-5xl font-black',
            'text-white tracking-tight',
          )}
        >
          Tim Profesional{' '}
          <span className="text-accent-300">
            Kami
          </span>
        </h2>
        <p
          className={cn(
            'text-sky-100/70 leading-relaxed',
            'max-w-xl mx-auto text-lg',
          )}
        >
          Tim kami terdiri dari psikolog berlisensi,
          konselor berpengalaman, dan tenaga ahli
          yang berdedikasi membantu Anda mencapai
          potensi terbaik.
        </p>
        <Button
          asChild
          size="lg"
          className={cn(
            'h-14 px-10 text-base rounded-2xl',
            'bg-accent-400 hover:bg-accent-300',
            'text-secondary font-bold shadow-lg',
            'shadow-accent-400/20',
            'transition-all group',
          )}
        >
          <Link
            href="/contact"
            className="flex items-center gap-2"
          >
            Hubungi Kami
            <ArrowRight
              className={cn(
                'w-5 h-5',
                'group-hover:translate-x-1',
                'transition-transform',
              )}
            />
          </Link>
        </Button>
      </div>
    </section>
  )
}
