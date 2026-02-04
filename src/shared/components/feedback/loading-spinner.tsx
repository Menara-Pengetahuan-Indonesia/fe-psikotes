import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function LoadingSpinner({
  size = 'md',
  text,
  className,
}: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        role="status"
        aria-label="Loading"
        className={cn(
          'animate-spin rounded-full border-primary border-t-transparent',
          {
            'h-4 w-4 border-2': size === 'sm',
            'h-8 w-8 border-4': size === 'md',
            'h-12 w-12 border-4': size === 'lg',
          }
        )}
      />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
    </div>
  )
}
