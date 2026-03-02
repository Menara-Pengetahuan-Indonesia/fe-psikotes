import { cn } from '@/lib/utils'

interface BermoelaTextProps {
  className?: string
  accentClassName?: string
}

export function BermoelaText({ className, accentClassName }: BermoelaTextProps) {
  return (
    <span className={cn("font-black tracking-tight", className)}>
      Berm
      <span className={cn(
        "italic font-serif underline decoration-accent-400/40 underline-offset-4", 
        accentClassName
      )}>
        oe
      </span>
      la
    </span>
  )
}
