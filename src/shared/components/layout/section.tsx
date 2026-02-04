import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ title, description, children, className }: SectionProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container mx-auto px-6">
        {title && (
          <h2 className="text-3xl font-bold mb-4">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-muted-foreground mb-8">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
