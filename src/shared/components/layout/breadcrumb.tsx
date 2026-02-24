'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex mb-6", className)}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            href="/pengguna" 
            className="text-slate-400 hover:text-primary-600 transition-colors flex items-center"
          >
            <Home className="size-4" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="size-4 text-slate-300 shrink-0" />
            {item.href ? (
              <Link
                href={item.href}
                className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-sm font-black text-slate-900 truncate max-w-[200px]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
