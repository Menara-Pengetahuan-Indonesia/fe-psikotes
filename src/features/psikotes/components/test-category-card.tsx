import Link from 'next/link'
import { ArrowRight, Users, Clock, CreditCard } from 'lucide-react'

import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

import type { PsikotesTest } from '../types'

interface TestCategoryCardProps {
  test: PsikotesTest
  number: number
  href: string
}

export function TestCategoryCard({ test, number, href }: TestCategoryCardProps) {
  const Icon = test.icon
  const badge = String(number).padStart(2, '0')

  return (
    <Card className="group flex flex-col min-h-105 p-0 border-slate-100 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 rounded-3xl">
      {/* Body */}
      <CardContent className="flex-1 flex flex-col px-8 pt-8 pb-0">
        {/* Icon row + number badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-black group-hover:text-white transition-colors">
            <Icon className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-4xl font-black text-slate-300 group-hover:text-slate-400 transition-colors">
              {badge}
            </span>
            <span className="px-3 py-1 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 rounded-lg">
              {test.tag}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight group-hover:underline decoration-2 underline-offset-4">
          {test.title}
        </h3>

        {/* Animated divider */}
        <div className="w-12 h-px bg-slate-200 mb-6 group-hover:w-full group-hover:bg-black transition-all duration-500" />

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed">
          {test.description}
        </p>
      </CardContent>

      {/* Stats + CTA */}
      <CardFooter className="flex-col gap-3 border-t border-slate-50 px-8 pt-6 pb-8">
        <div className="w-full flex flex-col gap-3 text-[11px] font-bold text-slate-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> {test.users}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {test.duration}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-900">
            <CreditCard className="w-3.5 h-3.5" />{' '}
            {test.price ?? 'Gratis'}
          </div>
        </div>

        <Link
          href={href}
          className="mt-2 w-full py-3 bg-slate-50 text-slate-900 rounded-xl text-xs font-bold uppercase tracking-wider group-hover:bg-black group-hover:text-white transition-all flex items-center justify-center gap-2"
        >
          Lihat Detail <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </CardFooter>
    </Card>
  )
}
