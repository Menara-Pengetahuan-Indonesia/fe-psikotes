import { Briefcase } from 'lucide-react'

import { TestCategoryCard } from '../../components'
import { PERUSAHAAN_TESTS } from '../../constants'
import {
  PerusahaanOverviewHero,
} from './perusahaan-overview-hero'

export function PerusahaanOverview() {
  return (
    <div className="bg-background">
      <PerusahaanOverviewHero />

      {/* ── Content Section ────────────────────────────────── */}
      <section className="py-14 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Label */}
          <div
            className={
              'flex flex-col md:flex-row'
              + ' md:items-end justify-between'
              + ' gap-6 mb-12'
            }
          >
            <div className="space-y-2">
              <div
                className={
                  'inline-flex items-center gap-2'
                  + ' text-primary-600 font-black'
                  + ' text-[10px] uppercase'
                  + ' tracking-[0.3em]'
                }
              >
                <Briefcase className="w-3 h-3" />
                Corporate Assessments
              </div>
              <h2
                className={
                  'text-3xl md:text-4xl font-black'
                  + ' text-slate-900 tracking-tight'
                }
              >
                Pilihan Tes{' '}
                <span className="text-primary-600 relative">
                  Perusahaan
                  <svg
                    className={
                      'absolute -bottom-2 left-0'
                      + ' w-full h-3'
                      + ' text-primary-300/50'
                    }
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 25 0, 50 5 T 100 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                  </svg>
                </span>
              </h2>
              <p
                className={
                  'text-slate-500 font-medium'
                  + ' text-sm max-w-md'
                }
              >
                Asesmen psikologi yang dirancang
                khusus untuk kebutuhan korporat.
              </p>
            </div>
            <div
              className={
                'h-px bg-slate-200 grow'
                + ' hidden md:block mx-8 mb-4'
              }
            />
          </div>

          {/* Card Grid */}
          <div
            className={
              'grid grid-cols-1 sm:grid-cols-2'
              + ' lg:grid-cols-3 gap-8'
            }
          >
            {PERUSAHAAN_TESTS.map((test, index) => (
              <div
                key={test.id}
                className="flex flex-col gap-4"
              >
                <TestCategoryCard
                  test={test}
                  number={index + 1}
                  href={
                    `/psikotes/perusahaan/${test.slug}`
                  }
                />

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 px-2">
                  {test.features.map((feature) => (
                    <span
                      key={feature.label}
                      className={
                        'px-3 py-1 bg-white'
                        + ' border border-stone-200'
                        + ' rounded-full text-[9px]'
                        + ' font-black uppercase'
                        + ' tracking-wider'
                        + ' text-stone-400 shadow-sm'
                      }
                    >
                      {feature.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
