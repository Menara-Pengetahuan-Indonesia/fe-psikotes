import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  price?: string
  tag?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  price,
  tag,
  actionLabel,
  onAction,
  className,
}: ServiceCardProps) {
  return (
    <Card
      className={cn(
        'group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-surface-100/50 border-primary-200/50',
        className
      )}
    >
      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="rounded-lg bg-primary-100 p-3 transition-colors duration-300 group-hover:bg-primary-600">
            <Icon className="size-6 text-primary-700 transition-colors duration-300 group-hover:text-white" />
          </div>
          {tag && (
            <Badge variant="secondary" className="shrink-0 bg-secondary-100 text-secondary-800 hover:bg-secondary-200">
              {tag}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <h3 className="text-lg font-bold text-secondary-900 group-hover:text-primary-700 transition-colors">{title}</h3>
        <p className="text-sm text-secondary-600 leading-relaxed">{description}</p>
      </CardContent>

      {(price || actionLabel) && (
        <CardFooter className="justify-between gap-4">
          {price && (
            <p className="text-lg font-black text-accent-600">{price}</p>
          )}
          {actionLabel && onAction && (
            <Button onClick={onAction} className="ml-auto">
              {actionLabel}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
