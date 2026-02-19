import Link from 'next/link'
import { ArrowRight, Users, Clock } from 'lucide-react'

import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

import type { PsikotesTest } from '../types'
import { cn } from '@/lib/utils'

interface TestCategoryCardProps {
  test: PsikotesTest
  number: number
  href: string
  variant?: 'teal' | 'amber' | 'indigo'
}

export function TestCategoryCard({ test, number, href, variant = 'teal' }: TestCategoryCardProps) {
  const Icon = test.icon
  const badge = String(number).padStart(2, '0')

  const themes = {
    teal: {
      border: 'hover:border-primary-500',
      shadow: 'hover:shadow-primary-900/10',
      iconBg: 'bg-primary-50',
      iconColor: 'text-primary-600',
      iconHover: 'group-hover:bg-primary-600',
      titleHover: 'group-hover:text-primary-700',
      userIcon: 'text-primary-500',
      btnBg: 'hover:bg-primary-600',
      btnShadow: 'hover:shadow-primary-600/20',
      aura: 'bg-primary-50',
      glow: 'bg-primary-400'
    },
    amber: {
      border: 'hover:border-accent-500',
      shadow: 'hover:shadow-accent-900/10',
      iconBg: 'bg-accent-50',
      iconColor: 'text-accent-600',
      iconHover: 'group-hover:bg-accent-600',
      titleHover: 'group-hover:text-accent-700',
      userIcon: 'text-accent-500',
      btnBg: 'hover:bg-accent-600',
      btnShadow: 'hover:shadow-accent-600/20',
      aura: 'bg-accent-50',
      glow: 'bg-accent-400'
    },
    indigo: {
      border: 'hover:border-indigo-500',
      shadow: 'hover:shadow-indigo-900/10',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      iconHover: 'group-hover:bg-indigo-600',
      titleHover: 'group-hover:text-indigo-700',
      userIcon: 'text-indigo-500',
      btnBg: 'hover:bg-indigo-600',
      btnShadow: 'hover:shadow-indigo-600/20',
      aura: 'bg-indigo-50',
      glow: 'bg-indigo-400'
    }
  }

  const theme = themes[variant]

  return (
    <Card className={cn(
      "group relative flex flex-col p-1 transition-all duration-500 overflow-hidden",
      "bg-white border border-slate-200 hover:shadow-2xl hover:-translate-y-1.5",
      "rounded-[2.5rem] shadow-sm",
      theme.border,
      theme.shadow
    )}>
      {/* Decorative Background Aura */}
      <div className={cn("absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500", theme.aura)} />

      {/* Body */}
      <CardContent className="relative z-10 flex-1 flex flex-col px-6 pt-7 pb-0">
        {/* Icon row + number badge */}
        <div
          className={cn(
            'flex justify-between',
            'items-start mb-6',
          )}
        >
          <div className="flex flex-col gap-1">
            <span
              className={cn(
                'text-3xl font-black',
                'text-slate-900',
              )}
            >
              {badge}
            </span>
            <span
              className={cn(
                'px-3 py-1 bg-stone-50',
                'text-[9px] font-black',
                'uppercase tracking-wider',
                'text-stone-400 rounded-full',
                'border border-stone-100',
              )}
            >
              {test.tag}
            </span>
          </div>
          <div className="relative">
            <div
              className={cn(
                'absolute inset-0 blur-xl',
                'opacity-0',
                'group-hover:opacity-40',
                'transition-opacity',
                'duration-500',
                theme.glow,
              )}
            />
            <div
              className={cn(
                'relative w-14 h-14',
                'rounded-2xl border',
                'flex items-center',
                'justify-center',
                'transition-all duration-500',
                'shadow-inner',
                theme.iconBg,
                theme.iconColor,
                theme.iconHover,
                'group-hover:text-white',
                'group-hover:border-transparent',
                variant === 'teal'
                  ? 'border-primary-100'
                  : variant === 'amber'
                    ? 'border-accent-100'
                    : 'border-indigo-100',
              )}
            >
              <Icon className="w-7 h-7 stroke-2" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className={cn("text-xl font-black text-stone-800 mb-3 leading-tight transition-colors", theme.titleHover)}>
          {test.title}
        </h3>

        {/* Description */}
        <p className="text-sm font-medium text-stone-500 leading-relaxed line-clamp-3 mb-6">
          {test.description}
        </p>
      </CardContent>

      {/* Stats + CTA */}
      <CardFooter className="relative z-10 flex-col gap-4 px-6 pt-4 pb-7">
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100 text-[10px] font-bold text-stone-500">
            <Users className={cn("w-3.5 h-3.5", theme.userIcon)} /> <span>{test.users} Peserta</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100 text-[10px] font-bold text-stone-500">
            <Clock className="w-3.5 h-3.5 text-sky-500" /> <span>{test.duration}</span>
          </div>
        </div>

        <Link
          href={href}
          className={cn(
            "group/btn w-full py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2",
            theme.btnBg,
            theme.btnShadow
          )}
        >
          Lihat Detail 
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}