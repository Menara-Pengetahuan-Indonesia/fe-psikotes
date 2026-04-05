import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FloatingIconProps {
  icon: LucideIcon
  className?: string
}

/** Static decorative icon with absolute positioning */
export function FloatingIcon({ icon: Icon, className }: FloatingIconProps) {
  return <Icon className={cn('absolute pointer-events-none', className)} />
}

interface GlowOrbProps {
  className?: string
  style?: React.CSSProperties
}

/** Static blur/glow orb with absolute positioning */
export function GlowOrb({ className, style }: GlowOrbProps) {
  return <div className={cn('absolute rounded-full pointer-events-none', className)} style={style} />
}

interface RippleCircleProps {
  className?: string
}

/** Static circle border (formerly animated ripple) */
export function RippleCircle({ className }: RippleCircleProps) {
  return <div className={cn('absolute border rounded-full pointer-events-none', className)} />
}

interface GlassPolygonProps {
  className?: string
}

/** Static glass polygon shard */
export function GlassPolygon({ className }: GlassPolygonProps) {
  return <div className={cn('absolute bg-white/10 backdrop-blur-sm border border-white/20 pointer-events-none', className)} />
}
