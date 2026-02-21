import { Plus, Diamond } from 'lucide-react'

import { cn } from '@/lib/utils'
import { TOPO_WHITE, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'

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
          backgroundImage: TOPO_WHITE,
          backgroundSize: TOPO_BG_SIZE,
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
