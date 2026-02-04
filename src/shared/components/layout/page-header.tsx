import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface PageHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  align?: 'left' | 'center'
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  badge,
  align = 'center',
  className,
}: PageHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  const badgeAlignClass = align === 'center' ? 'justify-center' : 'justify-start'

  return (
    <div className={cn(alignClass, className)}>
      {badge && (
        <div className={cn('mb-4 flex', badgeAlignClass)}>
          <Badge>{badge}</Badge>
        </div>
      )}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}
