import { Plus, Hexagon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TOPO_WHITE, TOPO_BG_SIZE } from '@/shared/constants/bg-patterns.constants'

export function CarouselBackdrop() {
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
          'absolute top-[10%] right-[6%]',
          'text-primary-600/15 w-8 h-8',
          'pointer-events-none',
        )}
      />
      <Plus
        className={cn(
          'absolute bottom-[15%] left-[4%]',
          'text-slate-400/15 w-6 h-6',
          'rotate-45 pointer-events-none',
        )}
      />
      <Hexagon
        className={cn(
          'absolute bottom-[25%] right-[12%]',
          'text-primary-600/[0.07]',
          'w-20 h-20 rotate-12',
          'pointer-events-none',
        )}
      />

      {/* Ambient Glows */}
      <div
        className={cn(
          'absolute -top-16 -right-16',
          'w-72 h-72 bg-primary-100/30',
          'rounded-full blur-[100px]',
          'pointer-events-none',
        )}
      />
      <div
        className={cn(
          'absolute -bottom-20 -left-20',
          'w-64 h-64 bg-accent-100/20',
          'rounded-full blur-[80px]',
          'pointer-events-none',
        )}
      />
    </>
  )
}
