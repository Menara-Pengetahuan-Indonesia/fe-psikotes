import Link from 'next/link'
import {
  ArrowLeft,
  Hexagon,
  Plus,
  Sparkles,
} from 'lucide-react'

import { cn } from '@/lib/utils'

interface ExamHeaderProps {
  currentIdx: number
  questionsLength: number
  progress: number
  backHref: string
  slug: string
}

export function ExamHeader({
  currentIdx,
  questionsLength,
  progress,
  backHref,
  slug,
}: ExamHeaderProps) {
  return (
    <header
      className={cn(
        'relative overflow-hidden',
        'bg-linear-to-b from-primary-800',
        'via-primary-700 to-primary-500',
        'text-white pt-28 pb-10 md:pt-36 md:pb-14',
      )}
    >
      {/* Topographic Pattern */}
      <div
        className={cn(
          'absolute inset-0 opacity-[0.05]',
          'pointer-events-none mix-blend-overlay',
        )}
        style={{
          backgroundImage:
            'url("data:image/svg+xml,'
            + '%3Csvg width=\'200\''
            + ' height=\'200\''
            + ' viewBox=\'0 0 200 200\''
            + ' xmlns=\'http://www.w3.org/'
            + '2000/svg\'%3E%3Cpath'
            + ' d=\'M0 100 C 20 80, 40 120,'
            + ' 60 100 S 100 80, 120 100'
            + ' S 160 120, 200 100\''
            + ' stroke=\'white\''
            + ' fill=\'transparent\''
            + ' stroke-width=\'1\'/%3E'
            + '%3C/svg%3E")',
          backgroundSize: '400px 400px',
        }}
      />

      {/* Ornaments */}
      <Plus
        className={cn(
          'absolute top-[15%] left-[8%]',
          'text-primary-400/20 w-8 h-8',
          'pointer-events-none',
        )}
      />
      <Hexagon
        className={cn(
          'absolute bottom-[12%] right-[8%]',
          'text-white/5 w-24 h-24',
          '-rotate-12 pointer-events-none',
        )}
      />

      {/* Ambient Glows */}
      <div
        className={cn(
          'absolute top-0 left-0',
          'w-96 h-96 bg-primary-500/20',
          'rounded-full blur-[120px]',
          '-translate-x-1/2 -translate-y-1/2',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute bottom-0 right-0',
          'w-80 h-80 bg-accent-500/10',
          'rounded-full blur-[100px]',
          'translate-x-1/4 translate-y-1/4',
          'pointer-events-none',
        )}
      />

      <div
        className={cn(
          'max-w-3xl mx-auto px-6',
          'relative z-10',
        )}
      >
        {/* Back link + Badge row */}
        <div
          className={cn(
            'flex items-center',
            'justify-between mb-6',
          )}
        >
          <Link
            href={
              backHref
                ?? `/psikotes/gratis/${slug}`
            }
            className={cn(
              'inline-flex items-center gap-2',
              'text-primary-200/80',
              'hover:text-white transition-colors',
              'text-sm font-bold',
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Detail
          </Link>

          <div
            className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-1.5 rounded-full',
              'bg-white/10 border border-white/10',
              'backdrop-blur-md',
            )}
          >
            <Sparkles
              className={cn(
                'w-3.5 h-3.5',
                'text-accent-300 fill-accent-300',
              )}
            />
            <span
              className={cn(
                'text-[10px] font-black',
                'tracking-[0.2em]',
                'text-primary-100 uppercase',
              )}
            >
              Soal {currentIdx + 1} dari{' '}
              {questionsLength}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className={cn(
            'w-full h-1.5 bg-white/10',
            'rounded-full overflow-hidden',
          )}
        >
          <div
            className={cn(
              'h-full bg-accent-300',
              'transition-all duration-500',
              'ease-out rounded-full',
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  )
}
