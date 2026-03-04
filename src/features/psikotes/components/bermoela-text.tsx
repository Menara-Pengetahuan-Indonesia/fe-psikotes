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
        "italic font-serif underline decoration-accent-600/60 underline-offset-4 text-accent-600", 
        accentClassName
      )}>
        oe
      </span>
      la
    </span>
  )
}
