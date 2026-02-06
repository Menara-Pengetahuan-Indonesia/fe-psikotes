'use client'

import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
      onClick={onAction}
      className={cn(
        'group relative flex flex-col p-1 transition-all duration-500 cursor-pointer overflow-hidden',
        'bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1.5',
        'rounded-[2.5rem] shadow-sm',
        className
      )}
    >
      {/* Decorative Background Aura */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="relative z-10 pt-7 px-7">
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner border border-emerald-100">
              <Icon className="size-8 group-hover:text-white transition-colors duration-500 stroke-[1.5]" />
            </div>
          </div>
          {tag && (
            <Badge className="bg-white text-emerald-700 border-slate-100 hover:bg-emerald-50 rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-wider transition-colors shadow-sm">
              {tag}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-3 mt-4 flex-1 px-7 pb-2">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-3">
          {description}
        </p>
      </CardContent>

      <CardFooter className="relative z-10 p-7 pt-2 flex items-center justify-between gap-4">
        {price && (
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mulai Dari</span>
            <p className="text-2xl font-black text-amber-500">{price}</p>
          </div>
        )}
        
        <div className="flex items-center gap-2 group/btn">
          <span className="text-sm font-black text-emerald-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            {actionLabel || 'Lihat Detail'}
          </span>
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:bg-emerald-600 group-hover:scale-110 shadow-slate-900/10 hover:shadow-emerald-600/20">
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:-rotate-45" />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
