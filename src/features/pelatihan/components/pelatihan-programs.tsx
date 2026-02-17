'use client'

import { Grid, Plus, Hexagon, Diamond } from 'lucide-react'

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'

import { ServiceCard } from '@/features/psikotes/components/service-card'

import { PELATIHAN_PROGRAMS } from '../constants'
import { cn } from '@/lib/utils'

const TAB_FILTERS: Record<string, string[]> = {
  semua: [],
  webinar: ['Webinar'],
  kelas: ['Kelas'],
  mentoring: ['Mentoring'],
}

const TOPOGRAPHIC_BG = `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 C 20 80, 40 120, 60 100 S 100 80, 120 100 S 160 120, 200 100' stroke='%23c2410c' fill='transparent' stroke-width='1'/%3E%3C/svg%3E")`

export function PelatihanPrograms() {
  const filtered = (tab: string) =>
    TAB_FILTERS[tab]?.length === 0
      ? PELATIHAN_PROGRAMS
      : PELATIHAN_PROGRAMS.filter(
          (s) => TAB_FILTERS[tab]?.includes(s.tag)
        )

  return (
    <section
      id="programs"
      className={cn(
        'py-24 md:py-36 bg-background',
        'relative overflow-hidden'
      )}
    >
      {/* --- RICH BACKGROUND ORNAMENTS --- */}
      {/* 1. Subtle Topographic Line Pattern */}
      <div
        className={cn(
          'absolute inset-0 opacity-[0.04]',
          'pointer-events-none mix-blend-multiply'
        )}
        style={{
          backgroundImage: TOPOGRAPHIC_BG,
          backgroundSize: '400px 400px',
        }}
      />

      {/* 2. Technical Ornaments */}
      <Plus
        className={cn(
          'absolute top-[10%] left-[10%]',
          'text-orange-600/20 w-8 h-8 animate-pulse'
        )}
      />
      <Plus
        className={cn(
          'absolute bottom-[10%] right-[15%]',
          'text-stone-400/20 w-10 h-10 rotate-45'
        )}
      />
      <Hexagon
        className={cn(
          'absolute top-[25%] right-[5%]',
          'text-orange-600/10 w-24 h-24',
          'rotate-12 animate-float-slow'
        )}
      />
      <Diamond
        className={cn(
          'absolute bottom-[20%] left-[5%]',
          'text-amber-600/10 w-16 h-16',
          '-rotate-12 animate-float-medium'
        )}
      />

      {/* 3. Ambient Glows */}
      <div
        className={cn(
          'absolute top-0 right-0 w-96 h-96',
          'bg-[radial-gradient(circle_at_30%_30%,#ffedd5_0%,#fed7aa_100%)]',
          'opacity-30 rounded-full blur-[100px]',
          'translate-x-1/3 -translate-y-1/3',
          'pointer-events-none'
        )}
      />
      <div
        className={cn(
          'absolute bottom-0 left-0 w-125 h-125',
          'bg-[radial-gradient(circle_at_30%_30%,#ffedd5_0%,#fed7aa_100%)]',
          'opacity-20 rounded-full blur-[120px]',
          '-translate-x-1/4 translate-y-1/4',
          'pointer-events-none'
        )}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2',
              'rounded-full bg-white border border-stone-200',
              'text-stone-600 text-[10px] font-black',
              'uppercase tracking-[0.2em] shadow-sm'
            )}
          >
            <Grid className="w-3 h-3 text-orange-600" />
            Featured Programs
          </div>
          <h2
            className={cn(
              'text-4xl md:text-5xl font-black',
              'tracking-tight text-stone-800 leading-[1.1]'
            )}
          >
            Program{' '}
            <span
              className={cn(
                'text-orange-600 relative inline-block'
              )}
            >
              Tersedia
              <svg
                className={cn(
                  'absolute -bottom-2 left-0',
                  'w-full h-2 text-orange-400/30'
                )}
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                />
              </svg>
            </span>
          </h2>
          <p
            className={cn(
              'text-stone-500 text-lg max-w-2xl',
              'mx-auto font-medium leading-relaxed'
            )}
          >
            Pilih program pengembangan diri yang sesuai
            dengan minat dan tujuanmu.
          </p>
        </div>

        {/* Tabs & Content */}
        <Tabs defaultValue="semua" className="w-full">
          <TabsList
            className={cn(
              'mx-auto flex justify-center w-fit mb-16',
              'bg-white border-2 border-stone-200',
              'p-1.5 rounded-full shadow-xl',
              'shadow-stone-200/50 backdrop-blur-sm'
            )}
          >
            {Object.keys(TAB_FILTERS).map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  'capitalize rounded-full px-8 py-3',
                  'font-black text-stone-500',
                  'data-[state=active]:bg-orange-600',
                  'data-[state=active]:text-white',
                  'data-[state=active]:shadow-lg',
                  'transition-all duration-300',
                  'hover:text-orange-700'
                )}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(TAB_FILTERS).map((tab) => (
            <TabsContent
              key={tab}
              value={tab}
              className="mt-0 outline-none"
            >
              <div
                className={cn(
                  'grid sm:grid-cols-2 lg:grid-cols-3',
                  'gap-8 animate-in fade-in',
                  'slide-in-from-bottom-8 duration-700'
                )}
              >
                {filtered(tab).map((program) => (
                  <ServiceCard
                    key={program.title}
                    title={program.title}
                    description={program.description}
                    price={program.price}
                    tag={program.tag}
                    icon={program.icon}
                    actionLabel="Daftar Sekarang"
                    onAction={() => {}}
                    className="h-full"
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
