import {
  GraduationCap,
  Plus,
  Hexagon,
  Diamond,
  BookOpen,
} from 'lucide-react'

import { TestCategoryCard } from '../../components'
import { MAHASISWA_TESTS } from '../../constants'

export function MahasiswaOverview() {
  return (
    <div className="bg-background">
      {/* ── Rich Hero ──────────────────────────────────────── */}
      <header
        className={
          'relative overflow-hidden text-white'
          + ' bg-linear-to-b from-primary-800'
          + ' via-primary-700 to-primary-500'
          + ' pt-28 pb-14 md:pt-36 md:pb-20'
        }
      >
        {/* Topographic SVG overlay */}
        <div
          className={
            'absolute inset-0 opacity-[0.05]'
            + ' pointer-events-none mix-blend-overlay'
          }
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'200\''
              + ' height=\'200\' viewBox=\'0 0 200 200\''
              + ' xmlns=\'http://www.w3.org/2000/svg\'%3E'
              + '%3Cpath d=\'M0 100 C 20 80, 40 120,'
              + ' 60 100 S 100 80, 120 100 S 160 120,'
              + ' 200 100\' stroke=\'white\''
              + ' fill=\'transparent\''
              + ' stroke-width=\'1\'/%3E%3C/svg%3E")',
            backgroundSize: '400px 400px',
          }}
        />

        {/* Ambient Glows */}
        <div
          className={
            'absolute top-[-10%] left-[-10%]'
            + ' w-150 h-150 bg-primary-900/20'
            + ' rounded-full blur-[120px]'
            + ' pointer-events-none animate-pulse'
          }
        />
        <div
          className={
            'absolute bottom-[-10%] right-[-5%]'
            + ' w-125 h-125 bg-primary-300/20'
            + ' rounded-full blur-[120px]'
            + ' pointer-events-none'
          }
        />

        {/* Floating Ornaments */}
        <Plus
          className={
            'absolute top-[15%] left-[10%]'
            + ' text-primary-300/30 w-8 h-8'
            + ' animate-pulse'
          }
        />
        <Hexagon
          className={
            'absolute top-[40%] right-[10%]'
            + ' text-white/5 w-24 h-24'
            + ' -rotate-12 animate-float-slow'
          }
        />
        <Diamond
          className={
            'absolute bottom-[10%] left-[20%]'
            + ' text-accent-400/20 w-16 h-16'
            + ' rotate-12 animate-float-medium'
          }
        />

        <div
          className={
            'max-w-7xl mx-auto px-6'
            + ' relative z-10 text-center'
          }
        >
          {/* Glassmorphic Badge */}
          <div
            className={
              'inline-flex items-center gap-2'
              + ' px-4 py-1.5 rounded-full'
              + ' bg-primary-700/50'
              + ' border border-primary-400/30'
              + ' shadow-lg backdrop-blur-md'
              + ' mb-8 mx-auto'
            }
          >
            <GraduationCap
              className="w-3.5 h-3.5 text-accent-400"
            />
            <span
              className={
                'text-[10px] font-black'
                + ' tracking-[0.2em]'
                + ' text-primary-50 uppercase'
              }
            >
              Student Solutions
            </span>
          </div>

          <h1
            className={
              'text-5xl md:text-7xl font-black'
              + ' tracking-tight leading-none'
              + ' mb-6 drop-shadow-2xl'
            }
          >
            Asesmen untuk<br />
            <span className="text-accent-300">
              Mahasiswa & Pelajar
            </span>
          </h1>

          <p
            className={
              'text-lg md:text-xl'
              + ' text-primary-50/80'
              + ' max-w-2xl mx-auto font-medium'
              + ' leading-relaxed'
            }
          >
            Temukan potensi terbaik Anda dengan rangkaian
            tes psikologi profesional yang dirancang khusus
            untuk mendukung perjalanan akademik dan karir.
          </p>
        </div>
      </header>

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
                <BookOpen className="w-3 h-3" />
                Student Assessments
              </div>
              <h2
                className={
                  'text-3xl md:text-4xl font-black'
                  + ' text-slate-900 tracking-tight'
                }
              >
                Pilihan Tes{' '}
                <span className="text-primary-600 relative">
                  Mahasiswa
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
                Rangkaian tes yang mendukung
                perjalanan akademik dan karir Anda.
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
              + ' lg:grid-cols-4 gap-6'
            }
          >
            {MAHASISWA_TESTS.map((test, index) => (
              <TestCategoryCard
                key={test.id}
                test={test}
                number={index + 1}
                href={
                  `/psikotes/mahasiswa/${test.slug}`
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
