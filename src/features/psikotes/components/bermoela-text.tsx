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
        "italic font-serif underline decoration-accent-500/60 underline-offset-4 text-accent-500", 
        accentClassName
      )}>
        oe
      </span>
      la
    </span>
  )
}
