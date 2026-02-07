'use client'

import Link from 'next/link'
import { Plus, Hexagon, Diamond, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const TOPO_PATTERN_SVG =
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
  + '%3C/svg%3E")'

interface AuthBrandingPanelProps {
  subtitle: string
}

export function AuthBrandingPanel({
  subtitle,
}: AuthBrandingPanelProps) {
  return (
    <div
      className={cn(
        'hidden lg:flex relative flex-col',
        'items-center justify-center',
        'bg-gradient-to-br from-emerald-950',
        'to-emerald-900 overflow-hidden',
      )}
    >
      {/* Topographic Pattern Overlay */}
      <div
        className={cn(
          'absolute inset-0 opacity-[0.05]',
          'pointer-events-none',
        )}
        style={{
          backgroundImage: TOPO_PATTERN_SVG,
          backgroundSize: '400px 400px',
        }}
      />

      {/* Ambient Glows */}
      <div
        className={cn(
          'absolute -top-32 -right-32',
          'w-96 h-96 rounded-full',
          'bg-emerald-800/30 blur-[120px]',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute -bottom-24 -left-24',
          'w-72 h-72 rounded-full',
          'bg-emerald-600/20 blur-[100px]',
          'pointer-events-none',
        )}
      />

      {/* Floating Ornaments */}
      <Plus
        className={cn(
          'absolute top-16 right-[15%]',
          'text-emerald-400/10 w-10 h-10',
          'pointer-events-none',
        )}
      />
      <Hexagon
        className={cn(
          'absolute bottom-20 left-[10%]',
          'text-emerald-400/10 w-12 h-12',
          'pointer-events-none',
        )}
      />
      <Diamond
        className={cn(
          'absolute top-[40%] left-[8%]',
          'text-white/5 w-8 h-8',
          'pointer-events-none',
        )}
      />

      {/* Center Content */}
      <div
        className={cn(
          'relative z-10 text-center',
          'space-y-6 px-12',
        )}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-3 group"
        >
          <div
            className={cn(
              'w-12 h-12 bg-emerald-500 rounded-xl',
              'flex items-center justify-center',
              'text-white shadow-lg',
              'group-hover:rotate-12',
              'transition-transform duration-300',
            )}
          >
            <Sparkles className="w-6 h-6 fill-white" />
          </div>
          <span
            className={cn(
              'text-4xl font-black text-white',
              'tracking-tighter',
            )}
          >
            BERMOELA
            <span className="text-emerald-400">.</span>
          </span>
        </Link>
        <p
          className={cn(
            'text-emerald-200/60 text-sm',
            'font-medium max-w-xs mx-auto',
          )}
        >
          {subtitle}
        </p>
      </div>
    </div>
  )
}
