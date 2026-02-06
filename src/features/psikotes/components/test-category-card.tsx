import Link from 'next/link'
import { ArrowRight, Users, Clock, CreditCard, Sparkles } from 'lucide-react'

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
}

export function TestCategoryCard({ test, number, href }: TestCategoryCardProps) {
  const Icon = test.icon
  const badge = String(number).padStart(2, '0')

  return (
    <Card className={cn(
      "group relative flex flex-col p-2 transition-all duration-500 overflow-hidden",
      "bg-white border-2 border-slate-100 border-b-[8px] border-b-emerald-100 hover:border-emerald-500 hover:border-b-emerald-600 hover:-translate-y-2 shadow-xl hover:shadow-2xl",
      "rounded-[2.5rem]"
    )}>
      {/* Decorative Background Aura */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Body */}
      <CardContent className="relative z-10 flex-1 flex flex-col px-6 pt-6 pb-0">
        {/* Icon row + number badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
              <Icon className="w-7 h-7 stroke-[2]" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-3xl font-black text-stone-200 group-hover:text-emerald-100 transition-colors">
              {badge}
            </span>
            <span className="px-3 py-1 bg-stone-50 text-[9px] font-black uppercase tracking-wider text-stone-400 rounded-full border border-stone-100">
              {test.tag}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-stone-800 mb-3 leading-tight group-hover:text-emerald-700 transition-colors">
          {test.title}
        </h3>

        {/* Description */}
        <p className="text-sm font-medium text-stone-500 leading-relaxed line-clamp-3 mb-6">
          {test.description}
        </p>
      </CardContent>

      {/* Stats + CTA */}
      <CardFooter className="relative z-10 flex-col gap-4 px-6 pt-4 pb-6">
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100 text-[10px] font-bold text-stone-500">
            <Users className="w-3.5 h-3.5 text-emerald-500" /> <span>{test.users} Peserta</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-100 text-[10px] font-bold text-stone-500">
            <Clock className="w-3.5 h-3.5 text-sky-500" /> <span>{test.duration}</span>
          </div>
        </div>

        <Link
          href={href}
          className="group/btn w-full py-3.5 bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-emerald-200 flex items-center justify-center gap-2"
        >
          Lihat Detail 
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}

