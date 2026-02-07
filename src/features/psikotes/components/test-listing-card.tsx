import Link from 'next/link'
import { ArrowRight, Users, Clock } from 'lucide-react'

import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

import type { PsikotesTest } from '../types'
import { cn } from '@/lib/utils'

interface TestListingCardProps {
  test: PsikotesTest
  variant?: 'emerald' | 'amber' | 'indigo'
}

export function TestListingCard({ test, variant = 'emerald' }: TestListingCardProps) {
  const Icon = test.icon
  const detailHref = `/psikotes/${test.category}/${test.slug}`

  const themes = {
    emerald: {
      border: 'hover:border-emerald-500',
      shadow: 'hover:shadow-emerald-900/10',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      iconHover: 'group-hover:bg-emerald-600',
      titleHover: 'group-hover:text-emerald-700',
      userIcon: 'text-emerald-500',
      btnBg: 'hover:bg-emerald-600',
      btnShadow: 'hover:shadow-emerald-600/20',
    },
    amber: {
      border: 'hover:border-amber-500',
      shadow: 'hover:shadow-amber-900/10',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      iconHover: 'group-hover:bg-amber-600',
      titleHover: 'group-hover:text-amber-700',
      userIcon: 'text-amber-500',
      btnBg: 'hover:bg-amber-600',
      btnShadow: 'hover:shadow-slate-900/20',
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
      {/* Body */}
      <CardContent className="relative z-10 flex-1 flex flex-col px-6 pt-7 pb-0">
        {/* Icon + category tag */}
        <div className="flex justify-between items-start mb-6">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
            theme.iconBg,
            theme.iconColor,
            theme.iconHover,
            "group-hover:text-white"
          )}>
            <Icon className="w-6 h-6 stroke-2" />
          </div>
          {test.subCategory && (
            <span className="px-3 py-1 bg-stone-50 text-[9px] font-black uppercase tracking-wider text-stone-400 rounded-full border border-stone-100">
              {test.subCategory}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={cn("text-lg font-black text-slate-800 mb-3 leading-tight transition-colors", theme.titleHover)}>
          {test.title}
        </h3>

        {/* Description */}
        <p className="text-xs font-medium text-stone-500 leading-relaxed line-clamp-3 mb-6">
          {test.description}
        </p>
      </CardContent>

      {/* Footer: stats + CTA */}
      <CardFooter className="relative z-10 flex-col gap-4 px-6 pt-4 pb-7">
        {/* Users + Duration row */}
        <div className="w-full flex items-center justify-between text-[10px] font-bold text-stone-400 uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Users className={cn("w-3.5 h-3.5", theme.userIcon)} /> {test.users}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-500" /> {test.duration}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={detailHref}
          className={cn(
            "w-full py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10",
            theme.btnBg,
            theme.btnShadow
          )}
        >
          Lihat Detail
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}