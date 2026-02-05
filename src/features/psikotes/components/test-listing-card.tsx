import Link from 'next/link'
import { ArrowRight, Users, Clock } from 'lucide-react'

import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

import type { PsikotesTest } from '../types'

interface TestListingCardProps {
  test: PsikotesTest
}

export function TestListingCard({ test }: TestListingCardProps) {
  const Icon = test.icon
  const detailHref = `/psikotes/${test.category}/${test.slug}`

  return (
    <Card className="group flex flex-col p-0 border-slate-100 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 rounded-3xl">
      {/* Body */}
      <CardContent className="flex-1 flex flex-col px-6 pt-6 pb-0">
        {/* Icon + category tag */}
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-black group-hover:text-white transition-colors">
            <Icon className="w-5 h-5 stroke-[1.5]" />
          </div>
          {test.subCategory && (
            <span className="px-3 py-1 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 rounded-lg">
              {test.subCategory}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-slate-900 mb-3 leading-tight group-hover:underline decoration-2 underline-offset-4">
          {test.title}
        </h3>

        {/* Price badge (premium only) */}
        {test.price && (
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-xl font-black text-slate-900">{test.price}</span>
            <span className="text-[10px] text-slate-400 font-medium">/ akses</span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed flex-grow">
          {test.description}
        </p>
      </CardContent>

      {/* Footer: stats + CTA */}
      <CardFooter className="flex-col gap-4 px-6 pt-6 pb-6">
        {/* Users + Duration row */}
        <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> {test.users}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {test.duration}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={detailHref}
          className="w-full py-3 bg-slate-50 text-slate-900 rounded-xl text-xs font-bold uppercase tracking-wider group-hover:bg-black group-hover:text-white transition-all flex items-center justify-center gap-2"
        >
          Mulai Tes <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </CardFooter>
    </Card>
  )
}
