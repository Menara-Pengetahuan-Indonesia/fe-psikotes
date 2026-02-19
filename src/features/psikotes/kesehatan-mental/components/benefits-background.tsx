import { Plus, Diamond } from 'lucide-react'

import { cn } from '@/lib/utils'

const TOPO_SVG =
  'url("data:image/svg+xml,'
  + '%3Csvg width=\'200\''
  + ' height=\'200\''
  + ' viewBox=\'0 0 200 200\''
  + ' xmlns=\'http://www.w3.org/'
  + '2000/svg\'%3E%3Cpath'
  + ' d=\'M0 100 C 20 80, 40 120,'
  + ' 60 100 S 100 80, 120 100'
  + ' S 160 120, 200 100\''
  + ' stroke=\'%23059669\''
  + ' fill=\'transparent\''
  + ' stroke-width=\'1\'/%3E'
  + '%3C/svg%3E")'

export function BenefitsBackground() {
  return (
    <>
      {/* Topographic Pattern */}
      <div
        className={cn(
          'absolute inset-0',
          'opacity-[0.03]',
          'pointer-events-none',
          'mix-blend-multiply',
        )}
        style={{
          backgroundImage: TOPO_SVG,
          backgroundSize: '400px 400px',
        }}
      />

      {/* Ornaments */}
      <Plus
        className={cn(
          'absolute top-[15%] right-[8%]',
          'text-primary-600/15 w-8 h-8',
          'pointer-events-none',
        )}
      />
      <Plus
        className={cn(
          'absolute bottom-[20%] left-[6%]',
          'text-slate-400/15 w-6 h-6',
          'rotate-45 pointer-events-none',
        )}
      />
      <Diamond
        className={cn(
          'absolute top-[30%] left-[12%]',
          'text-accent-500/[0.07]',
          'w-20 h-20 rotate-12',
          'pointer-events-none',
        )}
      />

      {/* Ambient Glows */}
      <div
        className={cn(
          'absolute -top-16 -left-16',
          'w-80 h-80 bg-primary-100/30',
          'rounded-full blur-[100px]',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute -bottom-16 -right-16',
          'w-64 h-64 bg-accent-100/20',
          'rounded-full blur-[80px]',
          'pointer-events-none',
        )}
      />
    </>
  )
}
